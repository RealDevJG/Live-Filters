let rainbowColour = Math.floor(randomHex() / 4294967295 * 16777215);

function rainbowFilter(_img)
{
    const r = ((rainbowColour >> 24) & 0xFF) + 1.299 % 256;
    const g = ((rainbowColour >> 16) & 0x00FF) + 1.587 % 256;
    const b = ((rainbowColour >> 8) & 0x0000FF) + 1.114 % 256;
    const a = ((rainbowColour) & 0x000000FF);

    rainbowColour = (r << 24) | (g << 16) | (b << 8) | a;
    applyFilters(_img, [maskChannelFilter(rainbowColour)]);
}
