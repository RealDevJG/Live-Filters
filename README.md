# Live-Filters

## Summary
This project shows a collection of multiple different types of filters, all running in real-time. The project uses a webcam to take your live input and filter it. The view in the bottom right of the grid shows a game-engine-like scene playing over the top of the filter - could be used to make an interactive game.

## Tech Stack
- `p5.js`
- `ml5.js`

## Features
- **Real-Time filtering:** filters are applied in real-time, which makes it interactive using a web-cam.
- **Game-Engine-Like scenes:** the lower-right view in the grid shows the game engine equivalent of a "scene" playing over the top of the image. There is a dropdown box to select the current scene and this can be expanded to be interactive like a video game.
- **Option sliders:** change the parameters of filters to change the look of them.
- **Change filter on the fly:** you can change the filter applied to the first of the 4th row using the shortcuts below.

## Keyboard shortcuts
- `S` - Takes a screenshot and uses them statically instead of a live webcam
- `Q` - Cycle to the previous filter for the first of the 4th row view (only works if a face is detected)
- `E` - Cycle to the next filter for the first of the 4th row view (only works if a face is detected)

## How to run the project
Double click the `index.html` file

## Visuals
![](./Assets/GitHub/Live%20Filter%20Example.gif)
This application uses a live webcam to work, however this example uses a static image.
> The GIFs shown are rendered at 24 frames per second and at lower quality - they are not representative of the in-app experience.
