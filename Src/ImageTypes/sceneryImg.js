class SceneryImg
{
    constructor(scene)
    {
        this.img = null;
        this.imgCopy = null;

        this.dropdown = null;

        this.scene = scene;
    }

    init()
    {
        this.dropdown = createSelect();
        this.dropdown.option("Snowy Scene");
        this.dropdown.option("Lava Bubble Scene");

        if (this.scene === lavaBubbleScene)
            this.dropdown.selected("Lava Bubble Scene");
        else
            this.dropdown.selected("Snowy Scene");

        this.dropdown.changed(() =>
        {
            this.setScene(this.dropdown.value());
        });

        this.img = img.get();
        this.imgCopy = img.get();
        applyFilters(this.img, this.scene.filters);
    }

    update()
    {
        this.scene.update();
    }

    draw(_canvas, _width, _height)
    {
        _canvas.image(this.img, 0, 0, _width, _height);
        this.scene.draw(_canvas);
    }

    setScene(_scene)
    {
        switch (_scene)
        {
            case "Snowy Scene":
                _scene = snowyScene;
                break;
            case "Lava Bubble Scene":
                _scene = lavaBubbleScene;
                break;
        }

        this.scene = _scene;
        this.img = this.imgCopy.get();
        applyFilters(this.img, this.scene.filters);
    }
}
