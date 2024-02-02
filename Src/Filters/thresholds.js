let thresholdSlider;

function thresholdFilter(_mask, _threshold)
{
    return function(_img)
    {
        let thresholdValue;

        if (_threshold)
            thresholdValue = _threshold;
        else
            thresholdValue = thresholdSlider.value();

        _img.loadPixels();
        for (let y = 0; y < _img.height; ++y)
        {
            for (let x = 0; x < _img.width; ++x)
            {
                const index = (x + y * _img.width) * 4;
                const r = _img.pixels[index + 0];
                const g = _img.pixels[index + 1];
                const b = _img.pixels[index + 2];
                const a = _img.pixels[index + 3];

                const uint32Colour = new Uint32Array(new ArrayBuffer(4));
                uint32Colour[0] = (r << 24) | (g << 16) | (b << 8) | a;

                const maskedColour = uint32Colour[0] & _mask;
                const maskedR = maskedColour >> 24 & 0xFF;
                const maskedG = maskedColour >> 16 & 0x00FF;
                const maskedB = maskedColour >> 8 & 0x0000FF;

                if (maskedR >= thresholdValue)
                    _img.pixels[index + 0] = maskedR;
                else
                    _img.pixels[index + 0] = 0;

                if (maskedG >= thresholdValue)
                    _img.pixels[index + 1] = maskedG;
                else
                    _img.pixels[index + 1] = 0;

                if (maskedB >= thresholdValue)
                    _img.pixels[index + 2] = maskedB;
                else
                    _img.pixels[index + 2] = 0;

                _img.pixels[index + 3] = maskedColour & 0x000000FF;
            }
        }
        _img.updatePixels();
    }
}
