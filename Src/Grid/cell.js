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
    [() => {}],
    [greyscaleFilter],
    [maskChannelFilter(0xFF0000FF)],
    [maskChannelFilter(0x00FF00FF)],
    [maskChannelFilter(0x0000FFFF)],
    [thresholdFilter(0xFF0000FF)],
    [thresholdFilter(0x00FF00FF)],
    [thresholdFilter(0x0000FFFF)],
    [() => {}],
];
