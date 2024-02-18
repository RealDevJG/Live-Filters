let webcam;

// Load a static image instead of live webcam for static branch
function preload()
{
    img = loadImage("Assets/eliz1.png", () => img.resize(imgWidth, imgHeight));
}

// Setup a grid of 3x6 images to perform the filter operations on
function setup()
{
    const canvas = createCanvas(imgScaledWidth * 3, imgScaledHeight * 6);
    init(canvas.elt);
}

function draw()
{
    background(255, 145, 175);
    GridManager.updateAndDrawCells();
}

function keyPressed()
{
    GridManager.keyPressed();
}
