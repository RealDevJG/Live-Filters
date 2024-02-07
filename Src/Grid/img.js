class Img
{
    constructor(_img, _filters)
    {
        this.img = _img.get();
        this.imgCopy = _img.get(); // backup so we can revert to the original image without taking a new snapshot on slider change
        this.filters = _filters;
    }

    // Apply all filter passes in the pipeline
    init()
    {
        applyFilters(this.img, this.filters);
    }

    // Revert back to original image and apply all filter passes in the pipeline
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

// Free function to apply entire filter pipelines because I want this function to be generic and work with all p5 images, not only my image class
function applyFilters(_img, _filters)
{
    for (const applyFilter of _filters)
        applyFilter(_img);
}
