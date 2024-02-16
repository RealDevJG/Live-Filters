let img;
let webcam;

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

    GridManager.setupCells(pipelines);
    setupSelectors(canvas.elt);
}

function draw()
{
    background(255, 145, 175);
    GridManager.updateAndDrawCells();
    // image(webcam, 0, 0, imgWidth * scale, imgHeight * scale);
}

function keyPressed()
{
    GridManager.keyPressed();
}
