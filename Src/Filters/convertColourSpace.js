function convertColourSpace(toColourSpace)
{
    return function(_img)
    {
        _img.loadPixels();
        for (let y = 0; y < _img.height; ++y)
        {
            for (let x = 0; x < _img.width; ++x)
            {
                const index = (x + y * _img.width) * 4;
                const colour = toColourSpace([_img.pixels[index + 0], _img.pixels[index + 1], _img.pixels[index + 2]]);

                _img.pixels[index + 0] = red(colour);
                _img.pixels[index + 1] = green(colour);
                _img.pixels[index + 2] = blue(colour);
            }
        }
        _img.updatePixels();
    }
}
