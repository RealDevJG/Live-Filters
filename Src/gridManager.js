// The amount the image will scale up after computation (for drawing only)
const scale = 1.3;

class GridManager
{
    static s_Grid = [];
    static s_Width = imgWidth * scale;
    static s_Height = imgHeight * scale;

    // Creates a separate canvas to house the image that will be affected by filter pipelines
    static addCell(_img)
    {
        const canvas = createGraphics(GridManager.s_Width, GridManager.s_Height);
        canvas.elt.setAttribute("willReadFrequently", true);

        GridManager.s_Grid.push({_img, canvas});
    }

    static setupCells()
    {
        for (let i = 0; i < pipelines.length; ++i)
        {
            pipelines[i].init();
            GridManager.addCell(pipelines[i]);
        }
    }

    // Update all detection images if q or e are pressed
    static keyPressed()
    {
        if (key !== "q" && key !== "e")
            return;

        for (const object of GridManager.s_Grid)
        {
            const cell = Object.values(object)[0];

            if (cell instanceof DetectionImg)
                cell.update();
        }
    }

    // Update all image types only if they have a value key of true (that first parameter in the pipelines array)
    static updateCells()
    {
        for (const object of GridManager.s_Grid)
        {
            const cell = Object.values(object)[0];

            if ("update" in cell && !(cell instanceof DetectionImg))
                cell.update();
        }
    }

    // Draw each image in its correct position that is automatically calculated no matter what the scale of the images are, as long as the canvas fits them properly
    static drawCells()
    {
        for (let i = 0; i < GridManager.s_Grid.length; ++i)
        {
            const cellImage = Object.values(GridManager.s_Grid[i])[0];
            const canvas = Object.values(GridManager.s_Grid[i])[1];

            const x = (i * GridManager.s_Width) % width;
            const y = Math.floor(i * GridManager.s_Width / width) * GridManager.s_Height;

            // Draw this cells canvas and then draw the image on top of it that belongs to this cell
            image(canvas, x, y);
            cellImage.draw(canvas, GridManager.s_Width, GridManager.s_Height);
        }
    }

    // Update and draw all cells abstracted into a single call
    // Only update cells on mousePress and every other frame to avoid performance issues
    static updateAndDrawCells()
    {
        GridManager.drawCells();
        GridManager.updateCells();
    }
}
