class RegularImg
{
    constructor(_filters)
    {
        this.img = null;
        this.filters = _filters;
    }

    init()
    {
        this.img = img.get();
        applyFilters(this.img, this.filters);
    }

    draw(_canvas, _width, _height)
    {
        _canvas.image(this.img, 0, 0, _width, _height);
    }
}
