function thresholdFilter(_mask)
{
    return function(_img, _threshold)
    {
        // Make an unsigned 32 bit integer view into an ArrayBuffer of 4 bytes (1 byte each for R, G, B, A), so we can use bitwise manipulation with a mask like in C++
        const uint32Colour = new Uint32Array(new ArrayBuffer(4));

        perPixel(_img, (_index) =>
        {
            // Shift R, G, B, A values into the appropriate position in the binary representation and OR them together to make it a single number
            uint32Colour[0] = (_img.pixels[_index + 0] << 24) | 
                              (_img.pixels[_index + 1] << 16) | 
                              (_img.pixels[_index + 2] << 8) | 
                               _img.pixels[_index + 3];

            // Mask the binary representation with the binary representation of the hex mask provided,
            // then extract each R, G, B back out again (alpha not needed yet as that can be extracted later on simply and readably)
            const maskedColour = uint32Colour[0] & _mask;
            const maskedR = maskedColour >> 24 & 0xFF;
            const maskedG = maskedColour >> 16 & 0x00FF;
            const maskedB = maskedColour >> 8 & 0x0000FF;

            // Check seperately if R, G, B are within the threshold or not. If they are set the appropriate pixel channel to that colour
            // else, discard the colour channel of that pixel (set to 0)
            if (maskedR >= _threshold)
                _img.pixels[_index + 0] = maskedR;
            else
                _img.pixels[_index + 0] = 0;

            if (maskedG >= _threshold)
                _img.pixels[_index + 1] = maskedG;
            else
                _img.pixels[_index + 1] = 0;

            if (maskedB >= _threshold)
                _img.pixels[_index + 2] = maskedB;
            else
                _img.pixels[_index + 2] = 0;

            // Extract and set the alpha that was masked
            _img.pixels[_index + 3] = maskedColour & 0x000000FF;
        });
    };
}
