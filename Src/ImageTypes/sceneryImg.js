class SceneryImg
{
    constructor(scene)
    {
        this.img = null;
        this.scene = scene;
    }

    init()
    {
        this.img = img.get();
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
}
