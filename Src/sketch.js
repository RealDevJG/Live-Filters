function setup()
{
    createCanvas(1280, 720);

    for (let i = 0; i < 8; ++i)
        GridManager.addCell(new Cell());
}

function draw()
{
    background(125);
    GridManager.drawCells();
}

function keyPressed()
{

}
