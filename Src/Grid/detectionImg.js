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
                this.detection = _detection;

                applyNextFilter(this.faceImg, this.filters, ++this.activeIndex);
            });
        });
    }

    update()
    {
        if (this.faceImg === null)
            return;

        this.faceImg = this.faceImgCopy.get();

        if (key === "q")
            applyNextFilter(this.faceImg, this.filters, --this.activeIndex);
        else if (key === "e")
            applyNextFilter(this.faceImg, this.filters, ++this.activeIndex);
    }

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
