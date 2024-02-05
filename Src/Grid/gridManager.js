const scale = 1.3;

class GridManager
{
    static s_Grid = [];
    static s_Width = imgWidth * scale;
    static s_Height = imgHeight * scale;

    // Will eventually change to trigger on both keyPressed OR on screenshot save from webcam
    static mouseReleased()
    {
        for (const cell of GridManager.s_Grid)
        {
            const cellImage = Object.values(cell)[0];

            if (cellImage instanceof DetectionImg)
                cellImage.update();
        }
    }

    static addCell(_image, _shouldUpdate)
    {
        const canvas = createGraphics(GridManager.s_Width, GridManager.s_Height);
        GridManager.s_Grid.push({
            [_shouldUpdate]: _image,
            canvas
        });
    }

    static setupCells()
    {
        for (let i = 0; i < pipelines.length; ++i)
        {
            const shouldUpdate = pipelines[i][0];
            const pipeline = pipelines[i].slice(1);

            // The 12th image should be the facial detection one
            if (i === 12)
                var image = new DetectionImg(img, pipeline);
            else
                var image = new Img(img, pipeline);

            GridManager.addCell(image, shouldUpdate);

            if (!(image instanceof DetectionImg))
                image.init();
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
            const cellImage = Object.values(GridManager.s_Grid[i])[0];
            const canvas = Object.values(GridManager.s_Grid[i])[1];

            const x = (i * GridManager.s_Width) % width;
            const y = Math.floor(i * GridManager.s_Width / width) * GridManager.s_Height;

            image(canvas, x, y);
            cellImage.draw(canvas, GridManager.s_Width, GridManager.s_Height);
        }
    }

    static updateAndDrawCells()
    {
        GridManager.drawCells();

        if (mouseIsPressed && frameCount % 2 === 0)
            GridManager.updateCells();
    }
}
