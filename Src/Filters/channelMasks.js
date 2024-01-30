function redFilter(_img)
{
    _img.loadPixels();
    for (let y = 0; y < _img.height; ++y)
    {
        for (let x = 0; x < _img.width; ++x)
        {
            const index = (x + y * _img.width) * 4;
            const r = _img.pixels[index + 0];

            _img.pixels[index + 0] = r;
            _img.pixels[index + 1] = 0;
            _img.pixels[index + 2] = 0;
            _img.pixels[index + 3] = 255;
        }
    }
    _img.updatePixels();
}

function greenFilter(_img)
{
    _img.loadPixels();
    for (let y = 0; y < _img.height; ++y)
    {
        for (let x = 0; x < _img.width; ++x)
        {
            const index = (x + y * _img.width) * 4;
            const g = _img.pixels[index + 1];

            _img.pixels[index + 0] = 0;
            _img.pixels[index + 1] = g;
            _img.pixels[index + 2] = 0;
            _img.pixels[index + 3] = 255;
        }
    }
    _img.updatePixels();
}

function blueFilter(_img)
{
    _img.loadPixels();
    for (let y = 0; y < _img.height; ++y)
    {
        for (let x = 0; x < _img.width; ++x)
        {
            const index = (x + y * _img.width) * 4;
            const b = _img.pixels[index + 2];

            _img.pixels[index + 0] = 0;
            _img.pixels[index + 1] = 0;
            _img.pixels[index + 2] = b;
            _img.pixels[index + 3] = 255;
        }
    }
    _img.updatePixels();
}
