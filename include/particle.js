class Particle {
    constructor(_x, _y, _z) {
        this.position = new Vector3D(_x,_y,_z);        
        this.velocity = new Vector3D(0,0,0);
        this.acceleration = new Vector3D(0,0,0);

        this.damping = 0.0;
        this.inverseMass = 0.0;
    }

    integrate(duration) {
        // No integration because of Infinite Mass
        if (this.inverseMass <= 0.0) {
            // return; // for time-being
        }

        console.log('yo');

        // Update position
        this.position.addScaledVector(this.velocity, duration);
        
        // Calculate acceleration
        let resultAcc = this.acceleration;
        // let resultAcc = new Vector3D();

        // Update velocity
        this.velocity.addScaledVector(resultAcc, duration);

        // Add drag to velocity
        this.velocity *= Math.pow(this.damping, duration);
    }
}

class ParticleDraw extends Particle {
    constructor(_x, _y, _z, _r) {
        super (_x, _y, _z);

        this.r = _r;
    }

    update() {
        this.velocity = new Vector3D(1,1,1);
        this.accleration = new Vector3D(1,0,0);

        super.integrate(1);
    }

    draw() {
        noStroke();
        fill(255);
        // sphere(this.r);
        ellipseMode(CENTER);
        ellipse(this.position.x, this.position.y, this.r, this.r);
    }
}