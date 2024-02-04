class Cell
{
    constructor(_img, _filters)
    {
        this.img = _img.get();
        this.imgCopy = _img.get();
        this.filters = _filters;

        applyFilters(this.img, this.filters);
    }

    update()
    {
        this.img = this.imgCopy.get();
        applyFilters(this.img, this.filters);
    }

    draw(_x, _y, _width, _height)
    {
        image(this.img, _x, _y, _width, _height);
    }
}

// The first parameter in each pipeline is a bool to declare if that specific pipeline should be updated on the slider change
const filterPipelines = [
    [false, () => {}], // Original Image unaltered image
    [false, greyscaleFilter], // Greyscale image
    [false, maskChannelFilter(0xFF0000FF)], // Red channel only of image
    [false, maskChannelFilter(0x00FF00FF)], // Green channel only of image
    [false, maskChannelFilter(0x0000FFFF)], // Blue channel only of image
    [true, thresholdFilter(0xFF0000FF, "thresholdSlider1")], // Red channel only of image thresholded by first slider
    [true, thresholdFilter(0x00FF00FF, "thresholdSlider1")], // Green channel only of image thresholded by first slider
    [true, thresholdFilter(0x0000FFFF, "thresholdSlider1")], // Blue channel only of image thresholded by first slider
    [false, () => {}], // Original image again (as requested by the instructions pdf)
    [false, convertColourSpace(toYUV)], // Converted to European Y’U’V’ (EBU)
    [false, convertColourSpace(toHSV)], // Converted to HSV
    [true, convertColourSpace(toYUV), thresholdFilter(0xFFFFFFFF, "thresholdSlider2")], // Converted to European Y’U’V’ (EBU) and then all channels thresholded by 2nd slider
    [true, convertColourSpace(toHSV), thresholdFilter(0xFFFFFFFF, "thresholdSlider2")] // Converted to HSV and then all channels thresholded by 2nd slider
];
