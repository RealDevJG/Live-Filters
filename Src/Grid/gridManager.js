const scale = 1.6;

class GridManager
{
    static s_Grid = [];
    static s_Width = imgWidth * scale;
    static s_Height = imgHeight * scale;

    static setup()
    {
        GridManager.clear();
        for (let i = 0; i < filterPipelines.length; ++i)
            GridManager.addCell(new Cell(img, filterPipelines[i]));
    }

    static clear()
    {
        GridManager.s_Grid = [];
    }

    static addCell(_cell)
    {
        GridManager.s_Grid.push(_cell);
    }

    static drawCells()
    {
        for (let i = 0; i < GridManager.s_Grid.length; ++i)
        {
            const x = (i * GridManager.s_Width) % width;
            const y = Math.floor(i * GridManager.s_Width / width) * GridManager.s_Height;

            GridManager.s_Grid[i].draw(x, y, GridManager.s_Width, GridManager.s_Height);
        }
    }
}
