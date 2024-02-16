const thresholdSliderOneId = "thresholdSlider1";
const thresholdSliderTwoId = "thresholdSlider2";

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
    new UpdateableImg(onSliderChange, [thresholdFilter(0xFF0000FF, thresholdSliderOneId)]),
    new UpdateableImg(onSliderChange, [thresholdFilter(0x00FF00FF, thresholdSliderOneId)]),
    new UpdateableImg(onSliderChange, [thresholdFilter(0x0000FFFF, thresholdSliderOneId)]),

    // Original image again (requested by instructions), colour space conversions
    new Img(),
    new RegularImg([convertColourSpace(toYUV)]),
    new RegularImg([convertColourSpace(toHSV)]),

    // Face detection image
    new DetectionImg(onKeyPress, [greyscaleFilter, blurFilter(boxBlurKernel), convertColourSpace(toHSV), fastPixelateFilter]),

    // Thresholded & colourspace conversion filters at the same time controlled by second slider
    new UpdateableImg(onSliderChange, [convertColourSpace(toYUV), thresholdFilter(0xFFFFFFFF, thresholdSliderTwoId)]),
    new UpdateableImg(onSliderChange, [convertColourSpace(toHSV), thresholdFilter(0xFFFFFFFF, thresholdSliderTwoId)]),

    // Extension filters:
    //  - Random colour channel masks
    //  - Rainbow filter
    //  - "Scene" with particles inside
    new RegularImg([maskChannelFilter(randomHex())]),
    new UpdateableImg(onFrameChange, [rainbowFilter]),
    new SceneryImg(snowyScene)
];
