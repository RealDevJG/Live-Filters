let img;

function preload()
{
    img = loadImage("Assets/test-image.jpg");
}

function setup()
{
    createCanvas(1280, 720);

    for (let i = 0; i < 14; ++i)
        GridManager.addCell(new Cell(img));
}

function draw()
{
    background(125);
    GridManager.drawCells();
    // image(img, 0, 0);
}

function keyPressed()
{

}
