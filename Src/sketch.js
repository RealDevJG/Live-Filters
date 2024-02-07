let img;

// Target computation width/height, not draw width/height
const imgWidth = 160;
const imgHeight = 120;

// preload a static image instead of live webcam (for now)
function preload()
{
    img = loadImage("Assets/eliz1.png", () => img.resize(imgWidth, imgHeight));
}

// Setup a grid of 3x6 images to perform the filters on
function setup()
{
    const canvas = createCanvas(imgWidth * scale * 3, imgHeight * scale * 6);
    additionalSetup(canvas.elt);

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
