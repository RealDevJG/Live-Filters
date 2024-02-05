class DetectionImg extends Img
{
    constructor(_img, _filters)
    {
        super(_img, _filters);

        // Start at a high number so that --activeIndex doesn't go below 0 and break things and make sure it starts at the first filter in the cycle
        this.activeIndex = (_filters.length) * 99999 - 1;

        this.faceImg = null;
        this.faceImgCopy = null;

        this.detectFace();
    }

    detectFace()
    {
        // Perform the face detection on the original image
        const faceapi = ml5.faceApi({}, () =>
        {
            faceapi.detectSingle(this.img, (_err, _detection) =>
            {
                this.faceImg = extractFace(this.img, _err, _detection);
                this.faceImgCopy = this.faceImg.get();

                applyNextFilter(this.faceImg, this.filters, ++this.activeIndex);
            });
        });
    }

    // TODO change to apply based on keyPresses instead of mouse click
    // and make q go --activeIndex whilst e goes ++activeIndex
    update()
    {
        this.faceImg = this.faceImgCopy.get();
        applyNextFilter(this.faceImg, this.filters, ++this.activeIndex);
    }

    draw(_canvas, _width, _height)
    {
        if (this.faceImg)
        {
            const faceWidth = this.faceImg.width * scale;
            const faceHeight = this.faceImg.height * scale;

            // TODO overlay with actual face original location
            image(this.faceImg, width - faceWidth, height - faceHeight, faceWidth, faceHeight);
            _canvas.image(this.img, 0, 0, _width, _height);
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

function applyNextFilter(_img, _filters, _index)
{
    const filter = _filters[_index % _filters.length];
    applyFilters(_img, [filter]);
}

function extractFace(_img, _err, _detection)
{
    if (_err)
    {
        console.error("Face not detected. Try again.");
        return; // TODO change this to return gracefully when a face is not detected otherwise it will ruin the app
    }

    if (_detection)
    {
        console.log("Face detected!");

        const { x, y, width, height } = _detection.alignedRect._box;
        return _img.get(int(x), int(y), int(width), int(height));
    }
}
