// Convolution function adapted from the lecture videos because the lecture video function had an issue, where the left and bottom sides
// of the convoluted image were black as they were using non-existent pixels out of bounds of the image
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
            colour.r += _img.pixels[convolutionIndex + 0] * _kernel[y][x];
            colour.g += _img.pixels[convolutionIndex + 1] * _kernel[y][x];
            colour.b += _img.pixels[convolutionIndex + 2] * _kernel[y][x];
        }
    }

    return colour;
}

// Generate a random hexadecimal value using Number() and string representations for random colour masks: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
function randomHex()
{
    // 16777215 because that's what the max hex value for RGB (0xFFFFFF) excluding alpha is in decimal
    return "0x" + Math.floor(Math.random() * 16777215).toString(16) + "FF";
}

// Allows you to loop over an entire image pixel array, perform an operation, then update the pixels to display the changes
function perPixel(_img, _operation, xStart = 0, yStart = 0, xInc = 1, yInc = 1)
{
    // If image is already loaded, don't waste time loading it again
    if (_img.pixels.length === 0)
        _img.loadPixels();

    for (let y = yStart; y < _img.height; y += yInc)
    {
        for (let x = xStart; x < _img.width; x += xInc)
        {
            const index = (x + y * _img.width) * 4;
            _operation(index, x, y);
        }
    }

    _img.updatePixels();
}

function setupInteractables(_canvas)
{
    const size = 255;

    let i = 0;
    for (const img of pipelines)
    {
        if (img instanceof UpdateableImg)
        {
            if (img.slider === null)
                continue;

            img.slider.size(size);
            img.slider.position(0, _canvas.offsetTop * i);

            i += 1.8;
        }
        else if (img instanceof SceneryImg)
        {
            img.dropdown.size(size);
            img.dropdown.position(0, _canvas.offsetTop * i);

            i += 2.5;
        }
    }
}

// Set the pixel density, sliders, and willReadFrequently attribute on the canvas
function additionalSetup(_canvas)
{
    _canvas.setAttribute("willReadFrequently", true);
    pixelDensity(1);

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

    frameRate(60);
}
