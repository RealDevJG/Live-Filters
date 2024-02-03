class Cell
{
    constructor(_img, _filters)
    {
        this.img = _img.get();

        for (const filter of _filters)
            filter(this.img);
    }

    draw(_x, _y, _width, _height)
    {
        image(this.img, _x, _y, _width, _height);
    }
}

const filterPipelines = [
    [() => {}], // Original Image unaltered image
    [greyscaleFilter], // Greyscale image
    [maskChannelFilter(0xFF0000FF)], // Red channel only of image
    [maskChannelFilter(0x00FF00FF)], // Green channel only of image
    [maskChannelFilter(0x0000FFFF)], // Blue channel only of image
    [thresholdFilter(0xFF0000FF, "thresholdSlider1")], // Red channel only of image thresholded by first slider
    [thresholdFilter(0x00FF00FF, "thresholdSlider1")], // Green channel only of image thresholded by first slider
    [thresholdFilter(0x0000FFFF, "thresholdSlider1")], // Blue channel only of image thresholded by first slider
    [() => {}], // Original image again (as requested by the instructions pdf)
    [convertColourSpace(toYUV)], // Converted to European Y’U’V’ (EBU)
    [convertColourSpace(toHSV)], // Converted to HSV
    [convertColourSpace(toYUV), thresholdFilter(0xFFFFFFFF, "thresholdSlider2")], // Converted to European Y’U’V’ (EBU) and then all channels thresholded by 2nd slider
    [convertColourSpace(toHSV), thresholdFilter(0xFFFFFFFF, "thresholdSlider2")] // Converted to HSV and then all channels thresholded by 2nd slider
];
