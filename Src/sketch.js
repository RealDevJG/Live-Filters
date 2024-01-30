let img;

function preload()
{
    img = loadImage("Assets/test-image.jpg");
}

function setup()
{
    createCanvas(1280, 720);

    for (let i = 0; i < filters.length; i++)
        GridManager.addCell(new Cell(img, filters[i]));
}

function draw()
{
    background(125);
    GridManager.drawCells();
}
