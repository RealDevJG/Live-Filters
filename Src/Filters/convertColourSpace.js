function convertColourSpace(toColourSpace)
{
    return function(_img)
    {
        perPixel(_img, (index) =>
        {
            const colour = toColourSpace([_img.pixels[index + 0], _img.pixels[index + 1], _img.pixels[index + 2]]);

            _img.pixels[index + 0] = colour.levels[0];
            _img.pixels[index + 1] = colour.levels[1];
            _img.pixels[index + 2] = colour.levels[2];
        });
    }
}
