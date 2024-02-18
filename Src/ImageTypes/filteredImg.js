class FilteredImg
{
    constructor(_filters)
    {
        this.img = null;
        this.filters = _filters;
    }

    // Set the image that we'll be working on and then apply filters to it
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

// Free function to apply entire filter pipelines because I want this function to be generic and work with all p5 images, not only my image class
function applyFilters(_img, _filters, _additionalParam)
{
    for (const applyFilter of _filters)
        applyFilter(_img, _additionalParam);
}
