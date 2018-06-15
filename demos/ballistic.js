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
        fill(255);
        // sphere(this.r);
        ellipseMode(CENTER);
        // ellipse(this.particle.position.x, this.particle.position.y,
        //         this.r, this.r);
        ellipse(position.x, position.y, this.r, this.r);


    }
}

class Ballistic {

    constructor() {
        this.ammoRounds = 16;
        this.ammo = []
        this.currentShotType = ShotType.UNUSED;

        for (let index = 0; index < this.ammoRounds; index++) {
            let a = new AmmoRound();
            a.type = ShotType.UNUSED;
            this.ammo.push(a);
            
        }
    }

    fire() {
        let shot;

        for (let index = 0; index < this.ammo.length; index++) {
            if (this.ammo[index].type == ShotType.UNUSED){
                shot = this.ammo[index];
                break;
            }
        }

        switch (this.currentShotType) {
            case ShotType.PISTOL:
                shot.particle.setMass(2.0); // 2.0kg
                shot.particle.setVelocity(0.0, 0.0, 35.0); // 35m/s
                shot.particle.setAcceleration(0.0, -1.0, 0.0);
                shot.particle.setDamping(0.99);
                break;

            case ShotType.ARTILLERY:
                shot.particle.setMass(200.0); // 200.0kg
                shot.particle.setVelocity(0.0, 30.0, 40.0); // 50m/s
                shot.particle.setAcceleration(0.0, -20.0, 0.0);
                shot.particle.setDamping(0.99);
                break;
            
            case ShotType.FIREBALL:
                shot.particle.setMass(1.0); // 1.0kg
                shot.particle.setVelocity(0.0, 0.0, 10.0); // 5m/s
                shot.particle.setAcceleration(0.0, 0.6, 0.0); // floats up
                shot.particle.setDamping(0.99);
                break;
            
            case ShotType.LASER:
                shot.particle.setMass(0.1); // 0.1kg - almost weighless
                shot.particle.setVelocity(0.0, 0.0, 100.0); // 100m/s
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
        let duration = 0.01;

        for (let index = 0; index < this.ammo.length; index++) {
            if (this.ammo[index].type !== ShotType.UNUSED){
                this.ammo[index].particle.integrate(duration);
                
                if (this.ammo[index].particle.getPosition().y < 0 ||
                    this.ammo[index].particle.getPosition().y > width) {
                        this.ammo[index].type = ShotType.UNUSED;
                    }
            
            }
        }
    }

    display() {
        for (let index = 0; index < this.ammo.length; index++) {
            if (this.ammo[index].type !== ShotType.UNUSED){
                this.ammo[index].render();
            }
        }

        switch (this.currentShotType) {
            case ShotType.PISTOL:
                text("PISTOL", 20, 20)
                break;

            case ShotType.ARTILLERY:
                text("ARTILLERY", 20, 20)
                break;
            
            case ShotType.FIREBALL:
                text("FIREBALL", 20, 20)
                break;
            
            case ShotType.LASER:
                text("LASER", 20, 20)
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