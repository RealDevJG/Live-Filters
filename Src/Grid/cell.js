class Cell
{
    constructor(_img, _filter)
    {
        this.background = color(random(255), random(255), random(255));
        this.img = _img.get();

        if (_filter !== undefined)
            _filter(this.img);
    }

    draw(_x, _y, _width, _height)
    {
        image(this.img, _x, _y, _width, _height);
    }
}

const filters = [() => {}, GreyscaleFilter];
