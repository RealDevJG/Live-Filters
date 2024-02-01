class Cell
{
    constructor(_img, _filters)
    {
        this.background = color(random(255), random(255), random(255));
        this.img = _img.get();

        for (const filter of _filters)
            filter(this.img);

        // if (_filter !== undefined)
        //     _filter(this.img);
    }

    draw(_x, _y, _width, _height)
    {
        image(this.img, _x, _y, _width, _height);
    }
}

const filterPipelines = [
    [() => {}],
    [GreyscaleFilter],
    [redFilter],
    [greenFilter],
    [blueFilter],
    /*[SegmentedImage1],
    [SegmentedImage2],
    [SegmentedImage3],*/
    [greenFilter, GreyscaleFilter, redFilter],
    [() => {}],
];
