// Convolution function adapted from the lecture videos because the lecture video function had an issue where the left and bottom sides
// of the convoluted image were black as not all pixels outside of the bounds of the image were excluded
function convolute(_img, _x, _y, _kernel)
{
    const kernelSize = _kernel.length;
    const offset = Math.floor(kernelSize / 2);

    const colour = { r: 0, g: 0, b: 0 };
    for (let y = 0; y < kernelSize; ++y)
    {
        for (let x = 0; x < kernelSize; ++x)
        {
            const pixelX = Math.max(0, Math.min(_x + x - offset, _img.width - 1));
            const pixelY = Math.max(0, Math.min(_y + y - offset, _img.height - 1));

            const convolutionIndex = (pixelX + pixelY * _img.width) * 4;
            colour.r += _img.pixels[convolutionIndex + 0] * _kernel[y][x]; // using y as first index to optimise cache hits for performance improvements
            colour.g += _img.pixels[convolutionIndex + 1] * _kernel[y][x];
            colour.b += _img.pixels[convolutionIndex + 2] * _kernel[y][x];
        }
    }

    return colour;
}

// Generate a random hexadecimal number
function randomHex()
{
    // 16777215 because that's what the maximum 24-bit hexadecimal value is when converted to decimal - (0xFFFFFF in decimal is 16777215)
    return "0x" + Math.floor(Math.random() * 16777215).toString(16) + "FF";
}

// Allows you to loop over an entire image pixel array, perform an operation, then update the pixels to display the changes
function perPixel(_img, _operation, _xStart = 0, _yStart = 0, _xInc = 1, _yInc = 1)
{
    // If pixels are already loaded, don't waste time loading them again
    if (_img.pixels.length === 0)
        _img.loadPixels();

    // _xStart, _yStart, _xInc, _yInc allow for looping over a custom area of pixels
    // This is used in the pixelate filter where we have to sample the colour of every 5 pixels instead of every pixel
    for (let y = _yStart; y < _img.height; y += _yInc)
    {
        for (let x = _xStart; x < _img.width; x += _xInc)
        {
            const index = (x + y * _img.width) * 4;
            _operation(index, x, y);
        }
    }

    _img.updatePixels();
}

// Positioning interactables such as sliders and dropdown boxes
function setupInteractables(_canvas)
{
    const size = 255;

    let i = 0;
    for (const img of pipelines)
    {
        // If this img instance doesn't have an interactable, don't do anything
        if (img.interactable === null || img.interactable === undefined)
            continue;

        img.interactable.size(size);
        img.interactable.position(0, _canvas.offsetTop * i);

        i += 2.2;
    }
}

// Set extra canvas options, webcam and interactables
function init(_canvas)
{
    _canvas.setAttribute("willReadFrequently", true);
    pixelDensity(1);
    frameRate(60);

    // Docs where I found out what constraints I could put: https://w3c.github.io/mediacapture-main/getusermedia.html#media-track-constraints
    const constraints = {
        video: {
            mandatory: {
                maxWidth: imgWidth,
                maxHeight: imgHeight
            },
            optional: [{ maxFrameRate: 20 }]
        },
        audio: false
    };

    webcam = createCapture(constraints);
    webcam.hide();

    // Tell the grid manager to set up its cells now before the interactables are set up
    GridManager.setupCells(pipelines);
    setupInteractables(_canvas);
}
