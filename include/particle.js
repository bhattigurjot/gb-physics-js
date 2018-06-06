class Particle {
    constructor(_x, _y, _z, _r) {
        this.x = _x;
        this.y = _y;
        this.z = _z;
        this.r = _r;
    }

    draw() {
        noStroke();
        fill(255);
        sphere(this.r);
        //ellipseMode(CENTER);
        //ellipse(this.x, this.y, this.r, this.r);
    }
}