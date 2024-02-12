class UpdateableImg
{
    constructor(updater, _filters)
    {
        this.img = null;
        this.imgCopy = null; // backup so we can revert to the original image without taking a new snapshot

        this.updater = updater;
        this.filters = _filters;
    }

    init()
    {
        this.img = img.get();
        this.imgCopy = img.get();
        applyFilters(this.img, this.filters);
    }

    // Revert back to original image and apply all filter passes in the pipeline
    update()
    {
        this.updater(this.img, this.filters, this.imgCopy);
    }

    draw(_canvas, _width, _height)
    {
        _canvas.image(this.img, 0, 0, _width, _height);
    }
}

function onSliderChange(_img, _filters)
{
    if (mouseIsPressed && frameCount % 4 === 0)
    {
        this.img = this.imgCopy.get();
        applyFilters(this.img, this.filters);
    }
}

function onFrameChange(_img, _filters)
{
    if (frameCount % 4 === 0)
    {
        this.img = this.imgCopy.get();
        applyFilters(this.img, this.filters);
    }
}
