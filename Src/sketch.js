let img;

const imgWidth = 160;
const imgHeight = 120;

function preload()
{
    img = loadImage("Assets/eliz1.png", () => img.resize(imgWidth, imgHeight));
}

function setup()
{
    const canvas = createCanvas(imgWidth * scale * 3, imgHeight * 6 * scale);
    pixelDensity(1);

    setupSliders(canvas.elt);
    GridManager.setupCells();
}

function draw()
{
    background(125);
    GridManager.updateAndDrawCells();
}

function mouseReleased()
{
    // Will eventually change to trigger on both keyPressed OR on screenshot save from webcam instead of mouseReleased
    GridManager.mouseReleased();
}
