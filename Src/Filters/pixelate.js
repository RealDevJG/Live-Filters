function fastPixelateFilter(_img)
{
    // Fast blur: the theory behind this was from this video (no code was shown in the video, only commentary): https://youtu.be/IMiiUEG-sLQ?si=qmH_81PH9nMyW5Jh&t=363
    // The idea is that a blurred image already has colour information from the pixels around it baked in so it's like taking the average, only faster
    fastBlur(_img, 2);

    perPixel(_img, (_index, _x, _y) =>
    {
        const colour = {
            r: _img.pixels[_index + 0],
            g: _img.pixels[_index + 1],
            b: _img.pixels[_index + 2]
        }

        // Loop through a 5x5 grid around the _x, _y pixel location and set them to the blurred pixel
        for (let y = -2; y <= 2; ++y)
        {
            for (let x = -2; x <= 2; ++x)
            {
                const index = ((_x + x) + (_y + y) * _img.width) * 4;

                _img.pixels[index + 0] = colour.r;
                _img.pixels[index + 1] = colour.g;
                _img.pixels[index + 2] = colour.b;
            }
        }
    }, 2, 2, 5, 5);
}






// README:
// I have left this code in so you can see my original implementation. This implementation was me trying to follow the instructions pdf, but I ended up having 6 nested for loops!
// I can tell that it is too slow for real time rendering even now at the time of writing this (I have not added the live-feed webcam yet
// and can still see that it won't be fast enough. My guess is that it's ~3ms too slow)
// This is the reason I redesigned the pixelate function to the above one. The below code doesn't utilise the new perPixel() additions to start and increment at a custom index
// as they were added after the fastPixelateFilter() function was finished

// function pixelateFilter(_img)
// {
//     _img.loadPixels();
//     for (let y = 2; y < _img.height; y += 5)
//     {
//         for (let x = 2; x < _img.width; x += 5)
//         {
//             const tempImg = _img.get(x - 2, y - 2, 5, 5);
//             const colour = averageChannels(tempImg);

//             perPixel(tempImg, (_index, _x, _y) =>
//             {
//                 const index = ((x + _x - 2) + (y + _y - 2) * _img.width) * 4;

//                 _img.pixels[index + 0] = colour.r;
//                 _img.pixels[index + 1] = colour.g;
//                 _img.pixels[index + 2] = colour.b;
//             });
//         }
//     }
//     _img.updatePixels();
// }

// function averageChannels(_img)
// {
//     _img.loadPixels();

//     const colour = { r: 0, g: 0, b: 0 };

//     perPixel(_img, (_index) =>
//     {
//         colour.r += _img.pixels[_index + 0] / (_img.width * _img.height);
//         colour.g += _img.pixels[_index + 1] / (_img.width * _img.height);
//         colour.b += _img.pixels[_index + 2] / (_img.width * _img.height);
//     });

//     return colour;
// }
