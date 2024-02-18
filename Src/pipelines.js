// These are the filter pipelines. Each line contains an entire pipeline of filters that are applied one after another within the passed array []
// The only exception is the DetectionImg() which doesn't use the filters as a pipeline, but as a cycle that is cycled through with the keys "e" and "q"
const pipelines = [
    // Original image, Greyscale image, empty square
    new RegularImg(),
    new FilteredImg([greyscaleFilter]),
    new FilteredImg([maskChannelFilter(0)]),

    // Red, Green, Blue filters
    new FilteredImg([maskChannelFilter(0xFF0000FF)]),
    new FilteredImg([maskChannelFilter(0x00FF00FF)]),
    new FilteredImg([maskChannelFilter(0x0000FFFF)]),

    // Red, Green, Blue Threshold filters controlled by first slider
    new UpdateableImg(onSliderChange, [thresholdFilter(0xFF0000FF)]),
    new UpdateableImg(onSliderChange, [thresholdFilter(0x00FF00FF)]),
    new UpdateableImg(onSliderChange, [thresholdFilter(0x0000FFFF)]),

    // Original image again (requested by instructions), colour space conversions
    new RegularImg(),
    new FilteredImg([convertColourSpace(toYUV)]),
    new FilteredImg([convertColourSpace(toHSV)]),

    // Face detection image
    new DetectionImg(onKeyPress, [greyscaleFilter, blurFilter(boxBlurKernel), convertColourSpace(toHSV), fastPixelateFilter]),

    // Thresholded & colourspace conversion filters at the same time controlled by second slider
    new UpdateableImg(onSliderChange, [convertColourSpace(toYUV), thresholdFilter(0xFFFFFFFF)]),
    new UpdateableImg(onSliderChange, [convertColourSpace(toHSV), thresholdFilter(0xFFFFFFFF)]),

    // Extension filters:
    //  - Random colour channel masks
    //  - Rainbow filter
    //  - "Scene" with particles of it flowing
    new FilteredImg([maskChannelFilter(randomHex())]),
    new UpdateableImg(onFrameChange, [rainbowFilter]),
    new SceneryImg(snowyScene)
];
