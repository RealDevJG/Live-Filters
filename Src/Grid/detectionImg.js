// I probably shouldn't have used inheritence as most functions are reimplemented anyway and this is not a good use of inheritence
// Now we have super.img, super.imageCopy, this.faceImg, this.faceImgCopy because of the super constructor...
class DetectionImg extends Img
{
    constructor(_img, _filters)
    {
        super(_img, _filters);

        // Start at a high number so that --activeIndex doesn't go below 0 and crash. It's scaled through multiplication to make sure it starts at the first filter in the cycle always
        // The number being this big will mean that even someone using an auto clicker to press q enough times to make the index below -1 and crash the app will take
        // 34.7 days at 20 clicks per second 999999 / 20 clicks per sec / 60 mins / 24 hours = 34.7 days
        this.activeIndex = _filters.length * 999999 - 1;

        this.faceImg = null;
        this.faceImgCopy = null;

        this.detectFace();
    }

    // Perform static image face recognition (for now until webcam hooked up)
    detectFace()
    {
        const faceapi = ml5.faceApi({}, () =>
        {
            faceapi.detectSingle(this.img, (_err, _detection) =>
            {
                this.faceImg = extractFace(this.img, _err, _detection);
                this.faceImgCopy = this.faceImg.get();
                this.detection = _detection;

                // Apply the first filter pass
                applyNextFilter(this.faceImg, this.filters, ++this.activeIndex);
            });
        });
    }

    // When q or e are pressed, the filter on the left or right of the currently active filter in the "pipeline" will be activated
    // "pipeline" is more of a cycle for DetectionImg
    update()
    {
        // Make sure faceImg exists first to prevent errors
        if (this.faceImg === null)
            return;

        this.faceImg = this.faceImgCopy.get();

        if (key === "q")
            applyNextFilter(this.faceImg, this.filters, --this.activeIndex);
        else if (key === "e")
            applyNextFilter(this.faceImg, this.filters, ++this.activeIndex);
    }

    // If the face has been detected, draw it over the original image after the correct filter has been applied in above functions,
    // else draw a solid colour background with text saying "Detecting Face..." written in the middle
    draw(_canvas, _width, _height)
    {
        if (this.faceImg)
        {
            const { x, y, width, height } = this.detection.alignedRect._box;

            _canvas.image(this.img, 0, 0, _width, _height);
            _canvas.image(this.faceImg, x * scale, y * scale, width * scale, height * scale);
        }
        else
        {
            const x = _canvas.width / 2;
            const y = _canvas.height / 2;

            // potentially replace with extremely blurred original image while loading in progress
            _canvas.fill(255, 145, 175);
            _canvas.rect(0, 0, _width, _height);

            _canvas.fill(0);
            _canvas.textSize(18);
            _canvas.textAlign(CENTER, CENTER);
            _canvas.text("Detecting Face...", x, y);
        }
    }
}

// Free function to apply a single filter to any image based on an index provided into a filter pipeline
function applyNextFilter(_img, _filters, _index)
{
    const applyFilter = _filters[_index % _filters.length];
    applyFilter(_img);
}

// Extracts the face from an image using the ml5 library (Only currently working statically)
function extractFace(_img, _err, _detection)
{
    if (_err)
    {
        console.error("Face not detected. Try again.");
        return; // TODO change this to return gracefully when a face is not detected otherwise it will ruin the app
    }

    if (_detection)
    {
        const { x, y, width, height } = _detection.alignedRect._box;
        return _img.get(int(x), int(y), int(width), int(height));
    }
}
