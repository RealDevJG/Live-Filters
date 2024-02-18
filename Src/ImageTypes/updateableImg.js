class UpdateableImg
{
    constructor(_updater, _filters)
    {
        this.img = null;
        this.imgCopy = null; // backup so we can revert to the original image without taking a new snapshot

        this.interactable = null;

        // An updater is a function pointer that is called whenever this image needs to update.
        // It can be any of these functions: onKeyPress, onFrameChange, onSliderChange
        this.updater = _updater;
        this.filters = _filters;
    }

    init()
    {
        this.setImgAndApplyFilters();

        // If the updater is onSliderChange, it means we need a slider so create one and set its event listener to call the updater method
        if (this.updater === onSliderChange)
        {
            this.interactable = createSlider(0, 255, 135);
            var value = this.interactable.value(); // Using var for a function-scope declaration so I can use it for the line after this if

            this.interactable.input(() => { this.updater(); });
        }

        applyFilters(this.img, this.filters, value);
    }

    update()
    {
        // If the updater is onSliderChange then don't call it because we've already set an event listener to update for us in this.init()
        if (this.updater === onSliderChange)
            return;

        this.updater();
    }

    draw(_canvas, _width, _height)
    {
        _canvas.image(this.img, 0, 0, _width, _height);
    }

    // Sets the new image to the webcam image and applies filters onto it
    setImgAndApplyFilters()
    {
        const [img, imgCopy] = takeScreenshot();

        this.img = img;
        this.imgCopy = imgCopy;

        if (this.interactable)
            var value = this.interactable.value();

        applyFilters(this.img, this.filters, value);
    }
}

function onSliderChange()
{
    this.img = this.imgCopy.get();
    applyFilters(this.img, this.filters, this.interactable.value());
}

// Apply this function every 4 frames instead of **every** frame to lower the intensiveness of this function
function onFrameChange()
{
    if (frameCount % 4 === 0)
    {
        this.img = this.imgCopy.get();
        applyFilters(this.img, this.filters);
    }
}
