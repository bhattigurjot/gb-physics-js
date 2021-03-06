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
        let m = this.magnitude();
        if (m > 0) {
            this.scale(1.0/m);
        }
    }

    clear() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
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
        this.x *= _s;
        this.y *= _s;
        this.z *= _s;
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

    orthogonalBasis(_vA, _vB, _vC)
    {
        _vA.normalize();
        _vC = Vector3D.vectorProduct(_vA, _vB)
        if (_vC.magnitudeSquare() == 0.0) 
        {
            return;
        }
        _vC.normalize();
        _vB = Vector3D.vectorProduct(_vC, _vA)
    }

    // Static Functions
    static scalerProduct(_vA, _vB) {
        return (_vA.x * _vB.x + _vA.y * _vB.y + _vC.z * _vC.z) 
    }

    static vectorProduct(_vA, _vB) {
        return Vector3D(_vA.y * _vB.z - _vA.z * _vB.y,
                        _vA.z * _vB.x - _vA.x * _vB.z,
                        _vA.x * _vB.y - _vA.y * _vB.x);
    }

}