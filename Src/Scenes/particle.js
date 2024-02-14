class Particle
{
    constructor(_pos, _dir, _speed, _size, _colour, _ttl, _variate, _active)
    {
        if (!_dir)
        {
            Object.assign(this, _pos);
        }
        else
        {
            this.pos = _pos;
            this.dir = _dir;
            this.speed = _speed;

            this.size = _size;
            this.colour = _colour;

            this.ttl = _ttl;
            this.variate = _variate;
            this.active = false;
        }

        this.shouldDelete = false;
    }

    cloneAndMutate()
    {
        const cloneData = structuredClone(this);
        cloneData.active = true;

        if (cloneData.variate)
        {
            cloneData.pos.x += random(-imgWidth / 1.2, imgWidth / 1.2);
            cloneData.pos.y += random(-10, 10);

            cloneData.speed.x += random(-this.speed.x / 7, 0.5);
            cloneData.speed.y += random(-this.speed.y / 8, 0.8);

            cloneData.size += random(-5, 5);
        }

        const clone = new Particle({ ...cloneData });
        return clone;
    }

    update()
    {
        if (!this.active)
            return;

        // update position. I could've used p5 vector functions, but they're very slow for performance
        this.pos.x += this.speed.x * this.dir.x;
        this.pos.y += this.speed.y * this.dir.y;

        // TODO revise comment:
        // update ttl around every second (assuming stable 30fps because using delta time is over engineering)
        if (frameCount % 30 === 0)
            --this.ttl;

        // delete if ttl is too low
        if (this.ttl < 0)
            this.shouldDelete = true;
    }

    draw(_canvas)
    {
        if (!this.active)
            return;

        _canvas.fill(this.colour);
        _canvas.circle(this.pos.x, this.pos.y, this.size);
    }
}
