// I probably shouldn't have used inheritence as most functions are reimplemented anyway and this is not a good use of inheritence
// Now we have super.img, super.imageCopy, this.faceImg because of the super constructor...
class DetectionImg
{
    constructor(_updater, _filters)
    {
        // Start at a high number so that --activeIndex doesn't go below 0 and crash. It's scaled through multiplication to make sure it starts at the first filter in the cycle always
        // The number being this big will mean that even someone using an auto clicker to press q enough times to make the index below -1 and crash the app will take
        // 34.7 days at 20 clicks per second 999999 / 20 clicks per sec / 60 mins / 24 hours = 34.7 days
        this.activeIndex = _filters.length * 999999;

        this.filters = _filters;
        this.updater = _updater;

        this.faceImg = null;
    }

    init()
    {
        this.detectFace();
    }

    // Perform static image face recognition (for now until webcam hooked up)
    detectFace()
    {
        const t = (_err, _detection) =>
        {
            const img = webcam.get();
            this.filters[this.activeIndex % this.filters.length](img);

            this.faceImg = extractFace(img, _err, _detection);

            if (this.faceImg)
                this.detection = _detection[0];

            faceapi.detect(t);
        }

        const faceapi = ml5.faceApi(webcam, {}, () =>
        {
            faceapi.detect(t);
        });
    }

    // When q or e are pressed, the filter on the left or right of the currently active filter in the "pipeline" will be activated
    // "pipeline" is more of a cycle for DetectionImg
    update()
    {
        this.updater();
    }

    // If the face has been detected, draw it over the original image after the correct filter has been applied in above functions,
    // else draw a solid colour background with text saying "Detecting Face..." written in the middle
    draw(_canvas, _width, _height)
    {
        if (this.faceImg)
        {
            const { x, y, width, height } = this.detection.alignedRect._box;

            _canvas.image(webcam, 0, 0, _width, _height);
            _canvas.image(this.faceImg, int(x) * scale, int(y) * scale, int(width) * scale, int(height) * scale);
        }
    }
}

function onKeyPress()
{
    if (key === "q")
        --this.activeIndex;
    else if (key === "e")
        ++this.activeIndex;
}

// Extracts the face from an image using the ml5 library (Only currently working statically)
function extractFace(_img, _err, _detection)
{
    if (_detection[0] && Object.keys(_detection[0]).length !== 0)
    {
        const { x, y, width, height } = _detection[0].alignedRect._box;
        return _img.get(int(x), int(y), int(width), int(height));
    }

    return null;
}
