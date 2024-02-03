function greyscaleFilter(_img)
{
    perPixel(_img, (index) =>
    {
        const average = min(255, ((_img.pixels[index + 0] + _img.pixels[index + 1] + _img.pixels[index + 2]) / 3) * 1.2);

        _img.pixels[index + 0] = average;
        _img.pixels[index + 1] = average;
        _img.pixels[index + 2] = average;
        _img.pixels[index + 3] = 255;
    });
}
