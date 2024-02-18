class Scene
{
    static s_Scenes = [];

    constructor(_name, _emitters, _filters)
    {
        this.name = _name;
        this.emitters = _emitters;
        this.filters = _filters;

        // Once the scene is created, push it to the static array of scenes so that we can know which scenes are available
        Scene.s_Scenes.push(this);
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
