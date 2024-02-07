// The amount the image will scale up after computation (for drawing only)
const scale = 1.3;

class GridManager
{
    static s_Grid = [];
    static s_Width = imgWidth * scale;
    static s_Height = imgHeight * scale;

    // Creates a separate canvas to house the image that will be affected by filter pipelines
    static addCell(_image, _shouldUpdate)
    {
        const canvas = createGraphics(GridManager.s_Width, GridManager.s_Height);
        canvas.elt.setAttribute("willReadFrequently", true);

        // Pushes an object that contains 2 key-value pairs: 1. false/true: imageObject, 2. a canvas object
        // true/false is whether the canvas will update on slider changes so that I don't have to waste computation power updating static filters
        GridManager.s_Grid.push({
            [_shouldUpdate]: _image,
            canvas
        });
    }

    // Adds one unaltered image to the grid for every entry in the pipelines array found in pipelines.js
    static setupCells()
    {
        for (let i = 0; i < pipelines.length; ++i)
        {
            const shouldUpdate = pipelines[i][0];
            const pipeline = pipelines[i].slice(1); // slice off the true/false shouldUpdate part of the array as it's no longer required

            // The 12th image should be the detection one for facial recognition
            if (i === 12)
                var image = new DetectionImg(img, pipeline);
            else
                var image = new Img(img, pipeline);

            GridManager.addCell(image, shouldUpdate);

            // Only call init on regular images because the init function applies the filter passes to the entire image instead of only the face
            if (!(image instanceof DetectionImg))
                image.init();
        }
    }

    // Update all detection images if q or e are pressed
    static keyPressed()
    {
        if (key !== "q" && key !== "e")
            return;

        for (const cell of GridManager.s_Grid)
        {
            const cellImage = Object.values(cell)[0];

            if (cellImage instanceof DetectionImg)
                cellImage.update();
        }
    }

    // Update all image types only if they have a value key of true (that first parameter in the pipelines array)
    static updateCells()
    {
        for (const cell of GridManager.s_Grid)
        {
            if (cell[true] !== undefined)
                cell[true].update();
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

        if (mouseIsPressed && frameCount % 2 === 0)
            GridManager.updateCells();
    }
}
