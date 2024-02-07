function greyscaleFilter(_img)
{
    perPixel(_img, (_index) =>
    {
        // Average R, G, B channels, multiply by 1.2 to increase the brightness by 20%, use Math.min() to stop the pixel information exceeding 255
        const average = Math.min(255, ((_img.pixels[_index + 0] + _img.pixels[_index + 1] + _img.pixels[_index + 2]) / 3) * 1.2);

        _img.pixels[_index + 0] = average;
        _img.pixels[_index + 1] = average;
        _img.pixels[_index + 2] = average;
        _img.pixels[_index + 3] = 255;
    });
}
