// Computation width/height, not the render width/height
const imgWidth = 160;
const imgHeight = 120;

// The amount the image will scale up after computation (for drawing only)
const scale = 1.3;

// Render width/height
const imgScaledWidth = imgWidth * scale;
const imgScaledHeight = imgHeight * scale;

class RegularImg
{
    constructor()
    {
        this.img = null;
    }

    // All init functions in img classes need to exist instead of doing its operations in the
    // constructor because the init functions load things after sketch.js has initialised its requisites
    init()
    {
        // Just get a plain image and do nothing with it so we can draw it plainly
        this.setImg()
    }

    draw(_canvas, _width, _height)
    {
        _canvas.image(this.img, 0, 0, _width, _height);
    }

    // Sets the new image to the webcam image
    setImg()
    {
        const [img] = takeScreenshot();
        this.img = img;
    }
}
