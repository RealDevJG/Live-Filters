const scale = 1.6;

class GridManager
{
    static s_Grid = [];
    static s_Width = imgWidth * scale;
    static s_Height = imgHeight * scale;

    static addCell(_cell, _shouldUpdate)
    {
        GridManager.s_Grid.push({ [_shouldUpdate]: _cell });
    }

    static setupCells()
    {
        for (let i = 0; i < filterPipelines.length; ++i)
        {
            GridManager.addCell(
                new Cell(img, filterPipelines[i].slice(1)),
                filterPipelines[i][0]
            );
        }
    }

    static updateCells()
    {
        for (const cell of GridManager.s_Grid)
        {
            if (cell[true] !== undefined)
                cell[true].update();
        }
    }

    static drawCells()
    {
        for (let i = 0; i < GridManager.s_Grid.length; ++i)
        {
            const cell = Object.values(GridManager.s_Grid[i])[0];
            const x = (i * GridManager.s_Width) % width;
            const y = Math.floor(i * GridManager.s_Width / width) * GridManager.s_Height;

            cell.draw(x, y, GridManager.s_Width, GridManager.s_Height);
        }
    }

    static updateAndDrawCells()
    {
        GridManager.drawCells();

        if (mouseIsPressed && frameCount % 2 === 0)
            GridManager.updateCells();
    }
}
