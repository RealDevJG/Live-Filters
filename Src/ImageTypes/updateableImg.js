class UpdateableImg
{
    constructor(updater, _filters)
    {
        this.img = null;
        this.imgCopy = null; // backup so we can revert to the original image without taking a new snapshot

        this.slider = null;

        this.updater = updater;
        this.filters = _filters;
    }

    init()
    {
        this.img = img.get();
        this.imgCopy = img.get();

        if (this.updater === onSliderChange)
        {
            this.slider = createSlider(0, 255, 135);
            var value = this.slider.value();

            this.slider.input(() => { this.updater(); });
        }

        applyFilters(this.img, this.filters, value);
    }

    update()
    {
        if (this.updater === onSliderChange)
            return;

        this.updater();
    }

    draw(_canvas, _width, _height)
    {
        _canvas.image(this.img, 0, 0, _width, _height);
    }
}

function onSliderChange()
{
    if (mouseIsPressed && frameCount % 4 === 0)
    {
        this.img = this.imgCopy.get();
        applyFilters(this.img, this.filters, this.slider.value());
    }
}

function onFrameChange()
{
    if (frameCount % 4 === 0)
    {
        this.img = this.imgCopy.get();
        applyFilters(this.img, this.filters);
    }
}
