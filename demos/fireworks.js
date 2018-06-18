// FIREWORKS

class Firework extends Particle{
    constructor() {
        super(0,0,0);

        this.type = undefined;
        this.age = 0;
    }

    update(_duration) {
        // Run physics
        this.integrate(_duration);
        // Reduce age
        this.age -= _duration;
        return (this.age < 0 || this.position.y < 0);
    }
}

// New firework type
class Payload {
    constructor() {
        // type of particle to create
        this.type = undefined;
        // number of particles in this payload
        this.count = undefined;
    }

    set(_type, _count) {
        this.type = _type;
        this.count = _count;
    }
}

class FireworkRule {
    constructor() {
        // type of firework managed by this rule
        this.type = 0;
        // minimum age of the fuse
        this.minAge = undefined;
        // maximum age of the fuse
        this.maxAge = undefined;
        // minimum relative velocity of this firework
        this.minVelocity = new Vector3D(0,0,0);
        // maximum relative velocity of this firework
        this.maxVelocity = new Vector3D(0,0,0);
        // damping value
        this.damping = undefined;

        // number of payloads in this rule
        this.payloadCount = undefined;
        // Payloads array
        this.payloads = [];

        // this.init();
    }

    init(_payloadCount) {
        this.payloadCount = _payloadCount;
        
        // Create a payload and add to payload array
        for (let index = 0; index < this.payloadCount; index++) {
            let p = new Payload();
            this.payloads.push(p);
        }
    }

    setParameters(_type, _minAge, _maxAge, _minVel, _maxVel, _damping) {
        this.type = _type;
        this.minAge = _minAge;
        this.maxAge = _maxAge;
        this.minVelocity = _minVel;
        this.maxVelocity = _maxVel;
        this.damping = _damping;
    }

    createFirework(_parent) {
        let _firework = new Firework();
        _firework.type = this.type;
        _firework.age = (Math.random() * 
                         (this.maxAge - this.minAge + 1.0) + 
                         this.minAge);

        let vel = new Vector3D(0,0,0);
        
        if (!_parent) {
            let start = new Vector3D(0,0,0);
            let x = Math.floor(Math.random() * 3) - 1;
            start.x = 5.0 * x;
            _firework.setPosition(start.x, start.y, start.z);
        } else {
            let _pos =  _parent.getPosition();
            _firework.setPosition(_pos.x, _pos.y, _pos.z);
            vel.addVector(_parent.getVelocity());
        }

        let _x = (Math.random() * 
                  (this.maxVelocity.x - this.minVelocity.x + 1.0) + 
                  this.minVelocity.x);
        let _y = (Math.random() * 
                  (this.maxVelocity.y - this.minVelocity.y + 1.0) + 
                  this.minVelocity.y);
        let _z = (Math.random() * 
                  (this.maxVelocity.z - this.minVelocity.z + 1.0) + 
                  this.minVelocity.z);

        vel.addVector(new Vector3D(_x, _y, _z));
        _firework.setVelocity(vel.x, vel.y, vel.z);

        // fixed mass for all fireworks
        _firework.setMass(1);
        _firework.setDamping(this.damping);
        _firework.setAcceleration(0.0, 10, 0); // gravity
        _firework.clearAccumulator();

        return _firework;
    }
}

class Fireworks {
    constructor() {
        this.maxFireworks = 1000;
        this.fireworks = []
        this.nextFirework = 0;
        this.ruleCount = 5;
        this.rules = []

        for (let index = 0; index < this.maxFireworks; index++) {
            let f = new Firework();
            f.type = 0;
            this.fireworks.push(f);
        }

        for (let index = 0; index < this.ruleCount; index++) {
            let fr = new FireworkRule();
            fr.type = 0;
            this.rules.push(fr);
        }

        // Create firework types
        this._initFireworkRules();
    }

    _initFireworkRules() {
        this.rules[0].init(2);
        this.rules[0].setParameters(
            1,
            0.5,
            1.4,
            new Vector3D(-25, -5, -5),
            new Vector3D(28, 5, 5),
            0.1
        );
        this.rules[0].payloads[0].set(3, 5);
        this.rules[0].payloads[0].set(2, 5);

        this.rules[1].init(1);
        this.rules[1].setParameters(
            2,
            0.5,
            1.0,
            new Vector3D(-10, -5, -5),
            new Vector3D(20, 5, 5),
            0.8
        );
        this.rules[1].payloads[0].set(3, 2);

        this.rules[2].init(0);
        this.rules[2].setParameters(
            3,
            0.5,
            1.5,
            new Vector3D(-5, -5, -5),
            new Vector3D(5, 5, 5),
            0.8
        );

        this.rules[3].init(1);
        this.rules[3].setParameters(
            4,
            0.25,
            0.5,
            new Vector3D(-5, -20, -5),
            new Vector3D(5, 20, 5),
            0.2
        );
        this.rules[3].payloads[0].set(1, 2);

        this.rules[4].init(1);
        this.rules[4].setParameters(
            5,
            0.5,
            1.0,
            new Vector3D(2, -20, -5),
            new Vector3D(18, 20, 5),
            0.01
        );
        this.rules[4].payloads[0].set(3, 5);

    }

    create(_type, _number, _parent) {
        if (_number) {
            for (let i = 0; i < _number; i++)
            {
                this.create(_type, undefined, _parent);
            }
        } else {
            // Get correct rule for the type
            let index = _type - 1;
            if (index <= 0) index = 0;
            if (index >= this.ruleCount - 1) index = this.ruleCount - 1;
            let rule = this.rules[index];
            // create the firework
            if (rule) 
                this.fireworks[this.nextFirework] = rule.createFirework(_parent);
            // increment the nextfirework
            this.nextFirework = (this.nextFirework + 1) % this.maxFireworks;
        }
    }

    update() {
        let duration = 0.1;

        for (let index = 0; index < this.fireworks.length; index++) {
            let fw = this.fireworks[index];
            if (fw.type > 0) {
                if (fw.update(duration)) {
                    let i = fw.type - 1;
                    if (i <= 0) i = 0;
                    if (i >= this.ruleCount - 1) i = this.ruleCount - 1;
                    let rule = this.rules[i];
                    fw.type = 0;
                    if (rule) {
                        for (let i = 0; i < rule.payloadCount; i++) {
                            var pl = rule.payloads[i];
                            this.create(pl.type, pl.count, fw);
                        }
                    }
                }
            }
        }
    }

    display() {
        for (let index = 0; index < this.fireworks.length; index++) {
            if (this.fireworks[index].type > 0) {
                switch (this.fireworks[index].type) {
                    case 1:
                        fill(255, 0, 0);
                        break;
                    case 2:
                        fill(255, 125, 0);
                        break;
                    case 3:
                        fill(255, 255, 0);
                        break;
                    case 4:
                        fill(0, 125, 0);
                        break;
                    case 5:
                        fill(0, 255, 0);
                        break;
                    default:
                        fill(255)
                        break;
                }

                let position = this.fireworks[index].getPosition();
        
                noStroke();

                push();

                translate(position.x, position.y, position.z);
                sphere(2);

                pop();
            }
        }
    }

    keyPressed(keyCode) {
        switch (keyCode) {
            case 49:
                this.create(1,1,undefined);
                break;
            case 50:
                this.create(2,1,undefined);
                break;
            case 51:
                this.create(3,1,undefined);
                break;
            case 52:
                this.create(4,1,undefined);
                break;
            case 53:
                this.create(5,1,undefined);
                break;
            default:
                break;
        }
    }
}

// P5 CANVAS

let f = new Fireworks();

let canvas;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    background(50);
    frameRate(30)
}

function draw() {
    background(50);
    f.update();
    f.display();
}

function keyPressed() {
    f.keyPressed(keyCode);
}