let thresholdSlider1;
let thresholdSlider2;

function thresholdFilter(_mask, _sliderId)
{
    return function(_img)
    {
        const threshold = document.getElementById(_sliderId).value;

        perPixel(_img, (index) =>
        {
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

            if (maskedR >= threshold)
                _img.pixels[index + 0] = maskedR;
            else
                _img.pixels[index + 0] = 0;

            if (maskedG >= threshold)
                _img.pixels[index + 1] = maskedG;
            else
                _img.pixels[index + 1] = 0;

            if (maskedB >= threshold)
                _img.pixels[index + 2] = maskedB;
            else
                _img.pixels[index + 2] = 0;

            _img.pixels[index + 3] = maskedColour & 0x000000FF;
        });
    }
}
