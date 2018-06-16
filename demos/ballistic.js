let ShotType = Object.freeze({
    "UNUSED":0,
    "PISTOL":1,
    "ARTILLERY":2,
    "FIREBALL":3,
    "LASER":4
});

class AmmoRound {

    constructor() {
        this.particle = new Particle(0,0,0);
        this.type = ShotType.PISTOL;
        this.startTime = 0.0;
        this.r = 10;
    }

    render() {
        let position = this.particle.getPosition();
        
        noStroke();

        push()

        translate(position.x, position.y, position.z);
        sphere(this.r);

        pop()
    }
}

class Ballistic {

    constructor() {
        this.ammoRounds = 10;
        this.ammo = []
        this.currentShotType = ShotType.PISTOL;

        for (let index = 0; index < this.ammoRounds; index++) {
            let a = new AmmoRound();
            a.type = ShotType.UNUSED;
            this.ammo.push(a);
        }
    }

    fire() {
        let shot = undefined;

        for (let index = 0; index < this.ammo.length; index++) {
            if (this.ammo[index].type === ShotType.UNUSED) {
                shot = this.ammo[index];
                break;
            }
        }

        // Return if no shot has been found
        if (shot == undefined) {
            return;
        }

        switch (this.currentShotType) {
            case ShotType.PISTOL:
                shot.particle.setMass(2.0); // 2.0kg
                shot.particle.setVelocity(35.0, 0.0, 0.0); // 35m/s
                shot.particle.setAcceleration(0.0, 0.5, 0.0);
                shot.particle.setDamping(0.99);
                break;

            case ShotType.ARTILLERY:
                shot.particle.setMass(200.0); // 200.0kg
                shot.particle.setVelocity(40.0, 30.0, 0.0); // 50m/s
                shot.particle.setAcceleration(0.0, 20.0, 0.0);
                shot.particle.setDamping(0.99);
                break;
            
            case ShotType.FIREBALL:
                shot.particle.setMass(1.0); // 1.0kg
                shot.particle.setVelocity(10.0, 0.0, 0.0); // 5m/s
                shot.particle.setAcceleration(0.0, -0.6, 0.0); // floats up
                shot.particle.setDamping(0.99);
                break;
            
            case ShotType.LASER:
                shot.particle.setMass(0.1); // 0.1kg - almost weighless
                shot.particle.setVelocity(100.0, 0.0, 0.0); // 100m/s
                shot.particle.setAcceleration(0.0, 0.0, 0.0); // No gravity
                shot.particle.setDamping(0.99);
                break;
        
            default:
                break;
        }

        shot.particle.setPosition(0.0, 1.5, 0.0);
        // shot.startTime = 
        shot.type = this.currentShotType;

        // Clear the forces
        shot.particle.clearAccumulator();
    }

    update() {
        let duration = 1;
        let boundary = 2000;
        
        for (let index = 0; index < this.ammo.length; index++) {
            if (this.ammo[index].type !== ShotType.UNUSED) {
                this.ammo[index].particle.integrate(duration);

                // Reuse ammo if out of boundary
                if (this.ammo[index].particle.getPosition().x < -boundary ||
                    this.ammo[index].particle.getPosition().x > boundary ||
                    this.ammo[index].particle.getPosition().y < -boundary ||
                    this.ammo[index].particle.getPosition().y > boundary) {
                        this.ammo[index].type = ShotType.UNUSED;
                    }
            }
        }
    }

    display() {
        for (let index = 0; index < this.ammo.length; index++) {
            if (this.ammo[index].type !== ShotType.UNUSED) {
                this.ammo[index].render();
            }
        }

        switch (this.currentShotType) {
            case ShotType.PISTOL:
                fill(255);
                // text("PISTOL", 0, 150)
                break;

            case ShotType.ARTILLERY:
                fill(0,0,255);
                // text("ARTILLERY", 0, 150)
                break;
            
            case ShotType.FIREBALL:
                fill(255,0,0);
                // text("FIREBALL", 0, 150)
                break;
            
            case ShotType.LASER:
                fill(0,255,0);
                // text("LASER", 0, 150)
                break;
        
            default:
                break;
        }

    }

    mouseClicked() {
        this.fire();
    }

    keyPressed(keyCode) {
        switch (keyCode) {
            case 49:
                this.currentShotType = ShotType.PISTOL;
                break;
            case 50:
                this.currentShotType = ShotType.ARTILLERY;
                break;
            case 51:
                this.currentShotType = ShotType.FIREBALL;
                break;
            case 52:
                this.currentShotType = ShotType.LASER;
                break;
            default:
                break;
        }
    }

}