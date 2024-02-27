// REPORT:
// Thresholding my images reveals to newer programmers that the segmented images are not uniform. For example, they can see that thresholding red and blue channels
// separately using the same threshold value will show that the red image and blue image reveal the underlying image differently - meaning that more of the users
// face will show in the red threshold than in the blue. This is dependent on the type of light that they're using and they'll see that natural light seems to
// create more colours in the reds than in the blues because blue waves are scattered by earths atmosphere, meaning that red waves will reach the users webcam more than blue.
// This did not reveal any new findings for myself as I am already an experienced Graphics Programmer.

// The biggest problem I faced was performance. I had to remake my img class so that I can have different variants. I didn't want to use inheritence as that
// is also slow for no good reason and it may also make copies of variables and functions that aren't necessary in all Img classes. I ended up making
// UpdateableImg which can update on frame change or on slider change. For the face recognition I have DetectionImg. The rest other than
// my extension Img are static images. This improved the performance greatly as not all images need to update every frame.

// I was completely on target to finish the project early. Since I am an experienced Graphics Programmer, I finished the code within 1 week of the assignment being released
// with not much time spent per day on it. I would have still liked to do something differently though and that "something" is planning. I want to improve my planning
// so I wish I had taken time to create UML diagrams. This was my first project where I have at least put some thought into using design patterns in my work.
// For example, UpdateableImg is using the strategy design pattern where I can pass a specific updater method like onFrameChange or onSliderChange to be used.
// I also started using free-functions rather than putting everything into class defintions. This is because it allows for reusable functions between classes 
// and easy adherence to the SOLID principles.

// I did two minor extensions where a random colour filter is applied to the bottom left image every time the page is refreshed and also a rainbow filter that changes on its own. 
// My main extension was making a scene system like in a video game where you can load a scene with a background image to the scene and have particles flying through the image.
// If I spent more time I could've even developed the scene system to allow me to also play small games over the top of the images like brick-breaker, though that seems too far
// and crossing into creating game-engine territory. The reason this is a unique extension is because I have not seen anyone adding an entire particle system + scene system to
// a filter application, and certainly not one where you can change the scene in real-time.

let webcam;

// Setup a grid of 3x6 images to perform the filter operations on
function setup()
{
    const canvas = createCanvas(imgScaledWidth * 3, imgScaledHeight * 6);
    init(canvas.elt);
}

function draw()
{
    background(255, 145, 175);
    GridManager.updateAndDrawCells();

    // A live webcam feed in the top left corner of the screen
    image(webcam, 0, 0, imgScaledWidth, imgScaledHeight);
}

function keyPressed()
{
    GridManager.keyPressed();
}
