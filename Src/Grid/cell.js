class Cell
{
    constructor(_img, _filters)
    {
        this.img = _img.get();
        this.filters = _filters;
    }

    draw(_x, _y, _width, _height)
    {
        const imgCopy = this.img.get();
        for (const filter of this.filters)
            filter(imgCopy);

        image(imgCopy, _x, _y, _width, _height);
    }
}

const filterPipelines = [
    [() => {}],
    [greyscaleFilter],
    [maskChannel(0xFF0000FF)],
    [maskChannel(0x00FF00FF)],
    [maskChannel(0x0000FFFF)],
    [threshold(0xFF0000FF)],
    [threshold(0x00FF00FF)],
    [threshold(0x0000FFFF)],
    [() => {}],
];
