class Scene
{
    constructor(_emitters)
    {
        // this.canvas = _canvas;
        this.emitters = _emitters;
    }

    // addEmitter(_emitter)
    // {
    //     this.emitters.push(_emitter);
    // }

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
