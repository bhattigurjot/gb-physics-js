// let p = new ParticleDraw(10,10,10,10);
let b = new Ballistic();

let canvas;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    background(50);
}

function draw() {
    background(50);
    b.update();
    b.display();
}

function keyPressed() {
    b.keyPressed(keyCode);
}

function mouseClicked() {
    b.mouseClicked();
}