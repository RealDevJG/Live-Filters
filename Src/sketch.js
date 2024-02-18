let webcam;

// Setup a grid of 3x6 images to perform the filter operations on
function setup()
{
    const canvas = createCanvas(imgScaledWidth * 3, imgScaledHeight * 6);
    init(canvas.elt);
}

function draw()
{
    background(255, 145, 175);
    GridManager.updateAndDrawCells();

    // A live webcam feed in the top left corner of the screen
    image(webcam, 0, 0, imgScaledWidth, imgScaledHeight);
}

function keyPressed()
{
    GridManager.keyPressed();
}
