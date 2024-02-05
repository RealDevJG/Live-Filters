function convertColourSpace(toColourSpace)
{
    return function(_img)
    {
        perPixel(_img, (index) =>
        {
            const colour = toColourSpace([_img.pixels[index + 0], _img.pixels[index + 1], _img.pixels[index + 2]]);

            _img.pixels[index + 0] = colour.levels[0];
            _img.pixels[index + 1] = colour.levels[1];
            _img.pixels[index + 2] = colour.levels[2];
        });
    }
}

// Convert to European Y’U’V’ (EBU)
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

// Convert to HSV
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
