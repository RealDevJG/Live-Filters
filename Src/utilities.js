function convolute()
{
    
}

function randomHex()
{
    // 16777215 because that's what the max hex value for RGB (0xFFFFFF) excluding alpha is in decimal
    return Number("0x" + Math.floor(Math.random()*16777215).toString(16) + "FF");
}

function perPixel(_img, _operation)
{
    // If image is already loaded, don't waste time loading it again
    if (_img.pixels.length === 0)
        _img.loadPixels();

    for (let y = 0; y < _img.height; ++y)
    {
        for (let x = 0; x < _img.width; ++x)
        {
            const index = (x + y * _img.width) * 4;
            _operation(index);
        }
    }

    _img.updatePixels();
}

function setupSliders(_element)
{
    const size = 128;

    thresholdSlider1 = createSlider(0, 255, 160).size(size);
    thresholdSlider1.id("thresholdSlider1");
    thresholdSlider1.position(_element.offsetLeft - size / 2, _element.offsetTop);

    thresholdSlider2 = createSlider(0, 255, 130).size(size);
    thresholdSlider2.id("thresholdSlider2");
    thresholdSlider2.position(_element.offsetLeft - size / 2, _element.offsetTop * 2.5);
}
