// Declared globally because if I declare it inside the blur function, it'll have to be instantiated in memory every time a blur is called resulting in wasted performance
const boxBlurKernel = [ // 9x9 kernel
    [1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81],
    [1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81],
    [1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81],
    [1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81],
    [1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81],
    [1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81],
    [1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81],
    [1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81],
    [1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81, 1/81]
]

// Both of these blur functions are used in their most appropriate places in the codebase:

// Fast blur: the theory behind this was from this video (no code was shown in the video, only commentary): https://youtu.be/IMiiUEG-sLQ?si=qmH_81PH9nMyW5Jh&t=363
// Shrink the image and then bring it back up to the original size. This automatically blurs the image from the intentional loss of pixel information from the shrinking
function fastBlur(_img, _amount)
{
    _img.resize(_img.width / _amount, _img.height / _amount);
    _img.resize(_img.width * _amount, _img.height * _amount);
}

// Blurs the image using a convolution kernel as shown in the lectures
function blurFilter(_kernel)
{
    return function(_img)
    {
        perPixel(_img, (_index, _x, _y) => 
        {
            const colour = convolute(_img, _x, _y, _kernel);

            _img.pixels[_index + 0] = colour.r;
            _img.pixels[_index + 1] = colour.g;
            _img.pixels[_index + 2] = colour.b;
        });
    };
}
