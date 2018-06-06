class Particle {
    constructor(_x, _y, _z, _r) {
        this.position = new Vector3D(_x,_y,_z);        
        this.velocity = new Vector3D(0,0,0);
        this.acceleration = new Vector3D(0,0,0);
        this.radius = _r;

        this.damping = 0.0;
        this.inverseMass = 0.0;
    }

    integrate(duration) {
        // No integration because of Infinite Mass
        if (this.inverseMass <= 0.0) {
            return;
        }

        // Update position
        this.position.addScaledVector(this.velocity, duration);
        
        // Calculate acceleration
        let resultAcc = acceleration;
        // let resultAcc = new Vector3D();

        // Update velocity
        this.velocity.addScaledVector(resultAcc, duration);

        // Add drag to velocity
        this.velocity *= Math.pow(this.damping, duration);
    }

    draw() {
        noStroke();
        fill(255);
        sphere(this.r);
        //ellipseMode(CENTER);
        //ellipse(this.x, this.y, this.r, this.r);
    }
}