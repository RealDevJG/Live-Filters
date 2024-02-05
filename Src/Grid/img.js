class Img
{
    constructor(_img, _filters)
    {
        this.img = _img.get();
        this.imgCopy = _img.get();
        this.filters = _filters;
    }

    init()
    {
        applyFilters(this.img, this.filters);
    }

    update()
    {
        this.img = this.imgCopy.get();
        applyFilters(this.img, this.filters);
    }

    draw(_canvas, _width, _height)
    {
        _canvas.image(this.img, 0, 0, _width, _height);
    }
}

function applyFilters(_img, _filters)
{
    for (const applyFilter of _filters)
        applyFilter(_img);
}
