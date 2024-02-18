class GridManager
{
    static s_Grid = [];

    // Creates a separate canvas to house the image that will be affected by filter pipelines
    static addCell(_img)
    {
        const canvas = createGraphics(imgScaledWidth, imgScaledHeight);
        canvas.elt.setAttribute("willReadFrequently", true);

        // Map each img to its own canvas whilst still preserving encapsulation by avoiding passing the canvas into the img object
        GridManager.s_Grid.push({_img, canvas});
    }

    // Make all img objects initialise and then pass them to addCell to allow for them to be mapped to their own individual canvases
    static setupCells()
    {
        for (let i = 0; i < pipelines.length; ++i)
        {
            pipelines[i].init();
            GridManager.addCell(pipelines[i]);
        }
    }

    // If the image object is derived from a class that has an update function, call it (except if it's a DetectionImg as that should only update onKeyPress)
    static updateCells()
    {
        for (const object of GridManager.s_Grid)
        {
            const img = Object.values(object)[0];

            if ("update" in img && !(img instanceof DetectionImg))
                img.update();
        }
    }

    // Draw each image in its correct position that is automatically calculated no matter what the scale of the images are
    // as long as the canvas width and height are exactly divisible by the image scaled widths and heights
    static drawCells()
    {
        for (let i = 0; i < GridManager.s_Grid.length; ++i)
        {
            const img = Object.values(GridManager.s_Grid[i])[0];
            const canvas = Object.values(GridManager.s_Grid[i])[1];

            const x = (i * imgScaledWidth) % width;
            const y = Math.floor(i * imgScaledWidth / width) * imgScaledHeight;

            // Draw this cells' canvas and then draw the image on top of it that belongs to this cell
            image(canvas, x, y);
            img.draw(canvas, imgScaledWidth, imgScaledHeight);
        }
    }

    // Update and draw all cells abstracted into a single call
    static updateAndDrawCells()
    {
        GridManager.drawCells();
        GridManager.updateCells();
    }

    // Update all detection images if "q" or "e" are pressed
    static keyPressed()
    {
        if (key !== "q" && key !== "e")
            return;

        for (const object of GridManager.s_Grid)
        {
            const img = Object.values(object)[0];

            if (img instanceof DetectionImg)
                img.update();
        }
    }
}
