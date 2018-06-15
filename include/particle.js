class Particle {
    constructor(_x, _y, _z) {
        this.position = new Vector3D(_x,_y,_z);        
        this.velocity = new Vector3D(0,0,0);
        this.acceleration = new Vector3D(0,0,0);

        this.forceAccum = new Vector3D(0,0,0);

        this.damping = 0.0;
        this.inverseMass = 0.0;
    }

    integrate(duration) {
        // No integration because of Infinite Mass
        if (this.inverseMass <= 0.0) {
            // return; // for time-being
        }

        // Update position
        this.position.addScaledVector(this.velocity, duration);
        
        // Calculate acceleration
        let resultAcc = this.acceleration;
        // F = ma
        resultAcc.addScaledVector(this.forceAccum, this.inverseMass);

        // Update velocity
        this.velocity.addScaledVector(resultAcc, duration);

        // Add drag to velocity
        this.velocity *= Math.pow(this.damping, duration);

        // Clear forces
        this.clearAccumulator();
    }

    setMass(_mass) {
        if (_mass) {
            this.inverseMass = 1.0/_mass;
        } else {
            Error('Mass cannot be zero.')
        }
    }

    getMass() {
        if (this.inverseMass == 0.0) {
            return Number.MAX_VALUE;
        } else{
            return 1.0/this.inverseMass;
        }
    }

    setInverseMass(_inverseMass) {
        this.inverseMass = _inverseMass;
    }

    getInverseMass() {
        return this.inverseMass;
    }

    hasInfiniteMass() {
        return this.inverseMass >= 0.0;
    }

    setDamping(_damping) {
        this.damping = this.damping;
    }

    getDamping() {
        return this.damping;
    }

    setPosition(_x, _y, _z) {
        this.position.x = _x;
        this.position.y = _y;
        this.position.z = _z;
    }

    getPosition() {
        return this.position;
    }

    setVelocity(_x, _y, _z) {
        this.velocity.x = _x;
        this.velocity.y = _y;
        this.velocity.z = _z;
    }

    getVelocity() {
        return this.velocity;
    }

    setAcceleration(_x, _y, _z) {
        this.acceleration.y = _y;
        this.acceleration.z = _z;
        this.acceleration.x = _x;
    }

    getAcceleration() {
        return this.acceleration;
    }

    clearAccumulator() {
        this.forceAccum.clear();
    }

    addForce(_force) {
        this.forceAccum.addVector(_force);
    }
}

