// Make a hexadecimal number but map it from the range of 0xFFFFFFFF to 0xFFFFFF because we don't care about the alpha
let rainbowColour = Math.floor(randomHex() / 0xFFFFFFFF * 0xFFFFFF);

function rainbowFilter(_img)
{
    // Work out rgb values, if they go above 255 wrap them back down so they don't get clamped by the browser
    // I made them adjust by the ratios of colour channel perception, though I'm not sure if that was necessary
    const r = ((rainbowColour >> 24) & 0xFF) + 1.299 % 255;
    const g = ((rainbowColour >> 16) & 0x00FF) + 1.587 % 255;
    const b = ((rainbowColour >> 8) & 0x0000FF) + 1.114 % 255;
    const a = ((rainbowColour) & 0x000000FF);

    // Set rainbowColour to the newly worked out colour so we can continue cycling to a new colour on the next function call
    rainbowColour = (r << 24) | (g << 16) | (b << 8) | a;
    applyFilters(_img, [maskChannelFilter(rainbowColour)]);
}
