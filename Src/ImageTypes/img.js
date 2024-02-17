// Computation width/height, not draw width/height
const imgWidth = 160;
const imgHeight = 120;

class Img
{
    constructor()
    {
        this.img = null;
    }

    // All init functions in img classes need to exist instead of doing its operations in the
    // constructor because the init functions load things after sketch.js has initialised its requisites
    init()
    {
        this.img = img.get();
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
