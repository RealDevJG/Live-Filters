let img;

const imgWidth = 160;
const imgHeight = 120;

function preload()
{
    img = loadImage("Assets/test-image.jpg");
}

function setup()
{
    createCanvas(1280, 720);
    pixelDensity(1);

    img.resize(imgWidth, imgHeight);
    thresholdSlider = createSlider(0, 255, 160);

    GridManager.setup();
}

function draw()
{
    background(125);
    GridManager.drawCells();
}

function mouseReleased()
{
    GridManager.setup();
}

function mouseDragged()
{
    GridManager.setup();
}
