class Particle
{
    constructor(_pos, _dir, _speed, _size, _colour, _ttl, _variate, _active)
    {
        // If direction doesn't exist, it means that only one argument was passed into the constructor
        // This one argument means that we received a cloneData object and need to assign it to this entire new instance
        if (!_dir)
        {
            Object.assign(this, _pos);
        }

        // if we recieved multiple arguments, we should assign them and default this.active to false as this is going to be a particleTemplate
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

    // This function clones the data of the particleTemplate and nudge its values a little bit in order to create a new particle
    // with slightly different properties in speed, position and size
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

        // Updating the position. I could've used p5 vector functions, but they're very slow for performance
        this.pos.x += this.speed.x * this.dir.x;
        this.pos.y += this.speed.y * this.dir.y;

        // Update the TTL around every 0.5 seconds (assuming stable 30fps because using delta time is over engineering)
        if (frameCount % 30 === 0)
            --this.ttl;

        // Mark this particle for deletion if the TTL is too low as that means its time has expired
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
