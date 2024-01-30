class GridManager
{
    static s_Grid = [];
    static s_Width = 160;
    static s_Height = 120;

    static addCell(_cell)
    {
        this.s_Grid.push(_cell);
    }

    static drawCells()
    {
        for (let i = 0; i < this.s_Grid.length; ++i)
            this.s_Grid[i].draw(i * this.s_Width, 0, this.s_Width, this.s_Height);
    }
}

class Cell
{
    constructor()
    {
        this.background = color(random(255), random(255), random(255));
    }

    draw(_x, _y, _width, _height)
    {
        fill(this.background);
        rect(_x, _y, _width, _height);
    }
}
