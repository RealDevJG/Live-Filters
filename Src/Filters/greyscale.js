function greyscaleFilter(_img)
{
    _img.loadPixels();
    for (let y = 0; y < _img.height; ++y)
    {
        for (let x = 0; x < _img.width; ++x)
        {
            const index = (x + y * _img.width) * 4;
            let average = ((_img.pixels[index + 0] + _img.pixels[index + 1] + _img.pixels[index + 2]) / 3) * 1.2;

            if (average > 255)
                average = 255; 

            _img.pixels[index + 0] = average;
            _img.pixels[index + 1] = average;
            _img.pixels[index + 2] = average;
            _img.pixels[index + 3] = 255;
        }
    }
    _img.updatePixels();
}
