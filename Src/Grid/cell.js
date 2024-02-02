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
    [thresholdFilter(0xFF0000FF)], // Red channel only of image thresholded
    [thresholdFilter(0x00FF00FF)], // Green channel only of image thresholded
    [thresholdFilter(0x0000FFFF)], // Blue channel only of image thresholded
    [() => {}], // Original image again (as requested by the instructions pdf)
    [convertColourSpace(toYUV)], // Converted to European Y’U’V’ (EBU)
    [convertColourSpace(toHSV)], // Converted to HSV
    [convertColourSpace(toYUV), thresholdFilter(0xFFFFFFFF, 200)], // Converted to European Y’U’V’ (EBU) and then all channels thresholded with static threshold of 200
    [convertColourSpace(toHSV), thresholdFilter(0xFFFFFFFF, 200)] // Converted to HSV and then all channels thresholded with static threshold of 200
];
