let img;

function preload()
{
    img = loadImage("Assets/test-image.jpg");
}

function setup()
{
    createCanvas(1280, 720);
    pixelDensity(1);

    // img.resize(160, 120); // TODO: potentially switch back to old method where it's drawn at that size instead of __being__ that size
    for (let i = 0; i < filters.length; i++)
        GridManager.addCell(new Cell(img, filters[i]));
}

function draw()
{
    background(125);
    GridManager.drawCells();
}
