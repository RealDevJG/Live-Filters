// The first parameter in each pipeline is a bool to declare if that specific pipeline should be updated on the slider change
const pipelines = [
    // Original image, Greyscale image, empty square
    [false, () => {}],
    [false, greyscaleFilter],
    [false, maskChannelFilter(0)],

    // Red, Green, Blue filters
    [false, maskChannelFilter(0xFF0000FF)],
    [false, maskChannelFilter(0x00FF00FF)],
    [false, maskChannelFilter(0x0000FFFF)],

    // Red, Green, Blue Threshold filters controlled by first slider
    [true, thresholdFilter(0xFF0000FF, "thresholdSlider1")],
    [true, thresholdFilter(0x00FF00FF, "thresholdSlider1")],
    [true, thresholdFilter(0x0000FFFF, "thresholdSlider1")],

    // Original image again (requested by instructions), colour space conversions
    [false, () => {}],
    [false, convertColourSpace(toYUV)],
    [false, convertColourSpace(toHSV)],

    // Face detection image
    [false, greyscaleFilter, blurFilter(boxBlurKernel), convertColourSpace(toHSV), fastPixelateFilter],

    // Thresholded & colourspace conversion filters at the same time controlled by second slider
    [true, convertColourSpace(toYUV), thresholdFilter(0xFFFFFFFF, "thresholdSlider2")],
    [true, convertColourSpace(toHSV), thresholdFilter(0xFFFFFFFF, "thresholdSlider2")],

    // Extension filters:
    //  - Random colour channel masks
    //  - particle filter (TODO)
    [false, maskChannelFilter(randomHex())],
    [false, fastPixelateFilter],
    [true, rainbowFilter],
];
