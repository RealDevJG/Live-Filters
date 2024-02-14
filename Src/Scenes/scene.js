class Scene
{
    constructor(_emitters, _filters)
    {
        this.emitters = _emitters;
        this.filters = _filters;
    }

    update()
    {
        for (const emitter of this.emitters)
            emitter.update();
    }

    draw(_canvas)
    {
        for (const emitter of this.emitters)
            emitter.draw(_canvas);
    }
}
