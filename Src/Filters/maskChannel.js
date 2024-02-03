function maskChannelFilter(mask)
{
    return function(_img)
    {
        perPixel(_img, (index) =>
        {
            const r = _img.pixels[index + 0];
            const g = _img.pixels[index + 1];
            const b = _img.pixels[index + 2];
            const a = _img.pixels[index + 3];

            const uint32Colour = new Uint32Array(new ArrayBuffer(4));
            uint32Colour[0] = (r << 24) | (g << 16) | (b << 8) | a;

            const maskedColour = uint32Colour[0] & mask;
            _img.pixels[index + 0] = maskedColour >> 24 & 0xFF;
            _img.pixels[index + 1] = maskedColour >> 16 & 0x00FF;
            _img.pixels[index + 2] = maskedColour >> 8 & 0x0000FF;
            _img.pixels[index + 3] = maskedColour & 0x000000FF;
        });
    }
}
