class Vector3D {

    constructor(_x, _y, _z ) {
        this.x = _x;
        this.y = _y;
        this.z = _z;
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    magnitudeSquare() {
        return (this.x * this.x + this.y * this.y + this.z * this.z);
    }

    normalize() {
        m = this.magnitude();
        if (m > 0) {
            this.scale(1.0/m);
        }
    }

    setMagnitude(s) {
        this.normalize();
        this.scale(s);
    }

    scalerProduct(_v) {
        return (this.x * _v.x + this.y * _v.y + this.z * _v.z) 
    }

    vectorProduct(_v) {
        return Vector3D(this.y * _v.z - this.z * _v.y,
                        this.z * _v.x - this.x * _v.z,
                        this.x * _v.y - this.y * _v.x);
    }

    scale(_s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
    }

    addScaledVector(_v, scale) {
        this.x += _v.x * scale;
        this.y += _v.y * scale;
        this.z += _v.z * scale;
    }

    componentProductUpdate(_v) {
        this.x *= _v.x;
		this.y *= _v.y;
		this.z *= _v.z;
    }

    addVector(_v) {
        this.x += _v.x;
        this.y += _v.y;
        this.z += _v.z;
    }

    subVector(_v) {
        this.x -= _v.x;
        this.y -= _v.y;
        this.z -= _v.z;
    }

    

    

    
}