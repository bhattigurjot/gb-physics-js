let p = new ParticleDraw(10,10,10,10);

let canvas;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    background(50);
}

function draw() {
    background(50);
    p.update();
    p.draw();
}