function pixelateFilter(_img)
{
    // greyscaleFilter(_img);

    _img.loadPixels();
    for (let y = 2; y < _img.height; y += 5)
    {
        for (let x = 2; x < _img.width; x += 5)
        {
            const tempImg = _img.get(x - 2, y - 2, 5, 5);
            const colour = averageChannels(tempImg);

            perPixel(tempImg, (_index, _x, _y) =>
            {
                const index = ((x + _x - 2) + (y + _y - 2) * _img.width) * 4;

                _img.pixels[index + 0] = colour.r;
                _img.pixels[index + 1] = colour.g;
                _img.pixels[index + 2] = colour.b;
            });
        }
    }
    _img.updatePixels();
}

function averageChannels(_img)
{
    _img.loadPixels();

    const colour = { r: 0, g: 0, b: 0 };

    perPixel(_img, (index) =>
    {
        colour.r += _img.pixels[index + 0] / (_img.width * _img.height);
        colour.g += _img.pixels[index + 1] / (_img.width * _img.height);
        colour.b += _img.pixels[index + 2] / (_img.width * _img.height);
    });

    return colour;
}
