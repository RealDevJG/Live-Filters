const scale = 1.6;

class GridManager
{
    static s_Grid = [];
    static s_Width = 160 * scale;
    static s_Height = 120 * scale;

    static addCell(_cell)
    {
        this.s_Grid.push(_cell);
    }

    static drawCells()
    {
        for (let i = 0; i < this.s_Grid.length; ++i)
        {
            const x = (i * this.s_Width) % width;
            const y = Math.floor(i * this.s_Width / width) * this.s_Height;

            this.s_Grid[i].draw(x, y, this.s_Width, this.s_Height);
        }
    }
}
