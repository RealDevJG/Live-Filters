function applyFilters(_img, _filters)
{
    for (const applyFilter of _filters)
        applyFilter(_img);
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

    thresholdSlider1 = createSlider(0, 255, 160);
    thresholdSlider1.size(size);
    thresholdSlider1.id("thresholdSlider1");
    thresholdSlider1.position(_element.offsetLeft + size / 2, _element.offsetTop - 25);

    thresholdSlider2 = createSlider(0, 255, 200);
    thresholdSlider2.size(size);
    thresholdSlider2.id("thresholdSlider2");
    thresholdSlider2.position(_element.offsetLeft + size * 1.5, _element.offsetTop - 25);
}

function toYUV(_colour)
{
    const r = _colour[0] / 255.0;
    const g = _colour[1] / 255.0;
    const b = _colour[2] / 255.0;

    const X = 0.431 * r + 0.342 * g + 0.178 * b;
    const Y = 0.222 * r + 0.707 * g + 0.071 * b;
    const Z = 0.020 * r + 0.130 * g + 0.939 * b;

    return color(X * 255.0, Y * 255.0, Z * 255.0);
}

function toHSV(_colour)
{
    _colour[0] /= 255.0;
    _colour[1] /= 255.0;
    _colour[2] /= 255.0;

    const minValue = min(_colour);
    const maxValue = max(_colour);
    const range = maxValue - minValue;

    const r = _colour[0];
    const g = _colour[1];
    const b = _colour[2];

    const saturation = range / maxValue;

    let hue = 0;
    if (saturation !== 0)
    {
        const R = (maxValue - r) / range;
        const G = (maxValue - g) / range;
        const B = (maxValue - b) / range;

        if (R === maxValue && G === minValue)
            hue = 5 + B;
        else if (R === maxValue && G !== minValue)
            hue = 1 - G;
        else if (G === maxValue && B === minValue)
            hue = 1 + R;
        else if (G === maxValue && B !== minValue)
            hue = 3 - B;
        else if (R === maxValue)
            hue = 3 + G;
        else
            hue = 5 - R;
    }

    return color(map(hue, 0, 6, 0, 255), saturation * 255, maxValue * 255);
}
