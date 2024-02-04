let img;

const imgWidth = 160;
const imgHeight = 120;

function preload()
{
    img = loadImage("Assets/test-image.jpg", () => img.resize(imgWidth, imgHeight));
}

function setup()
{
    const canvas = createCanvas(1280, 720);
    pixelDensity(1);

    setupSliders(canvas.elt);
    GridManager.setupCells();
}

function draw()
{
    background(125);
    GridManager.drawCells();

    // TODO refactor
    if (mouseIsPressed)
    {
        if (frameCount % 2 === 0)
            GridManager.updateCells();
    }
}

function mouseReleased()
{
    GridManager.updateCells();
}
