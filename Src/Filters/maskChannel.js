function maskChannelFilter(mask)
{
    return function(_img)
    {
        // Make an unsigned 32 bit integer view into an ArrayBuffer of 4 bytes (1 byte each for R, G, B, A), so we can use bitwise manipulation with a mask like in C++
        const uint32Colour = new Uint32Array(new ArrayBuffer(4));

        perPixel(_img, (_index) =>
        {
            uint32Colour[0] = (_img.pixels[_index + 0] << 24) | 
                              (_img.pixels[_index + 1] << 16) | 
                              (_img.pixels[_index + 2] << 8) | 
                              _img.pixels[_index + 3];

            // Mask the binary representation with the binary representation of the hex mask provided,
            // then extract each R, G, B, A channels back out again once the mask is complete
            const maskedColour = uint32Colour[0] & mask;
            _img.pixels[_index + 0] = maskedColour >> 24 & 0xFF;
            _img.pixels[_index + 1] = maskedColour >> 16 & 0x00FF;
            _img.pixels[_index + 2] = maskedColour >> 8 & 0x0000FF;
            _img.pixels[_index + 3] = maskedColour & 0x000000FF;
        });
    };
}
