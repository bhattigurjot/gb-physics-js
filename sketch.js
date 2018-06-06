let p = new Particle(10,10,100,100);

let canvas;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    background(50);
}

function draw() {
    p.draw();
}