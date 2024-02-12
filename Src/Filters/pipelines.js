// The first parameter in each pipeline is a bool to declare if that specific pipeline should be updated on the slider change
const pipelines = [
    // Original image, Greyscale image, empty square
    new Img(),
    new RegularImg([greyscaleFilter]),
    new RegularImg([maskChannelFilter(0)]),

    // Red, Green, Blue filters
    new RegularImg([maskChannelFilter(0xFF0000FF)]),
    new RegularImg([maskChannelFilter(0x00FF00FF)]),
    new RegularImg([maskChannelFilter(0x0000FFFF)]),

    // Red, Green, Blue Threshold filters controlled by first slider
    new UpdateableImg(onSliderChange, [thresholdFilter(0xFF0000FF, "thresholdSlider1")]),
    new UpdateableImg(onSliderChange, [thresholdFilter(0x00FF00FF, "thresholdSlider1")]),
    new UpdateableImg(onSliderChange, [thresholdFilter(0x0000FFFF, "thresholdSlider1")]),

    // Original image again (requested by instructions), colour space conversions
    new Img(),
    new RegularImg([convertColourSpace(toYUV)]),
    new RegularImg([convertColourSpace(toHSV)]),

    // Face detection image
    new DetectionImg(onKeyPress, [greyscaleFilter, blurFilter(boxBlurKernel), convertColourSpace(toHSV), fastPixelateFilter]),

    // Thresholded & colourspace conversion filters at the same time controlled by second slider
    new UpdateableImg(onSliderChange, [convertColourSpace(toYUV), thresholdFilter(0xFFFFFFFF, "thresholdSlider2")]),
    new UpdateableImg(onSliderChange, [convertColourSpace(toHSV), thresholdFilter(0xFFFFFFFF, "thresholdSlider2")]),

    // Extension filters:
    //  - Random colour channel masks
    //  - particle filter (TODO)
    new RegularImg([maskChannelFilter(randomHex())]),
    new RegularImg([fastPixelateFilter]),
    new UpdateableImg(onFrameChange, [rainbowFilter]),
];
