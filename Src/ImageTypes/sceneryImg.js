class SceneryImg
{
    constructor(_scene)
    {
        this.img = null;
        this.imgCopy = null;

        // Dropdown menu and the scene that this image is currently showing
        this.interactable = null;
        this.scene = _scene;
    }

    // This function is called after the p5 setup(), so p5 objects are initialised in here instead of the constructor - which is called before p5 is initialised
    init()
    {
        this.setupSelector();

        this.img = img.get();
        this.imgCopy = img.get();

        // Apply the active scenes filters to the image
        applyFilters(this.img, this.scene.filters);
    }

    update()
    {
        this.scene.update();
    }

    // Draw the background image of the scene and then the scene itself
    draw(_canvas, _width, _height)
    {
        _canvas.image(this.img, 0, 0, _width, _height);
        this.scene.draw(_canvas);
    }

    // Set the current scene based on the scene name passed into the parameters and then apply the scene filters onto the background
    setScene(_sceneName)
    {
        // Loop through all available scenes that are loaded and check if the name of any scene matches the one we're looking for
        // if it does, set the current active scene to that one
        for (const scene of Scene.s_Scenes)
        {
            if (scene.name === _sceneName)
                this.scene = scene;
        }

        this.img = this.imgCopy.get();
        applyFilters(this.img, this.scene.filters);
    }

    setupSelector()
    {
        this.interactable = createSelect();

        // Loop through all scenes in the available scenes list and add them as a dropdown box option
        for (const scene of Scene.s_Scenes)
        {
            this.interactable.option(scene.name);

            // If the default scene name of THIS constructed instance matches a scene name in the available list, put that as the default selected box
            if (this.scene.name === scene.name)
                this.interactable.selected(scene.name);
        }

        // Add an event listener to change scenes to the newly selected one from the dropdown menu
        this.interactable.changed(() =>
        {
            this.setScene(this.interactable.value());
        });
    }
}
