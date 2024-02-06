let img;

const imgWidth = 160;
const imgHeight = 120;

function preload()
{
    img = loadImage("Assets/eliz1.png", () => img.resize(imgWidth, imgHeight));
}

function setup()
{
    const canvas = createCanvas(imgWidth * scale * 3, imgHeight * scale * 6);
    pixelDensity(1);

    setupSliders(canvas.elt);
    GridManager.setupCells();
}

function draw()
{
    background(125);
    GridManager.updateAndDrawCells();
}

function keyPressed()
{
    GridManager.keyPressed();
}
