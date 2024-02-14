class Emitter
{
    constructor(_pos, _dir, _particleTemplate, _spawnRate)
    {
        this.particles = [];

        this.pos = _pos;
        this.dir = _dir;

        this.spawnRate = _spawnRate;
        this.particleTemplate = _particleTemplate;
    }

    spawnParticle()
    {
        this.particles.push(this.particleTemplate.cloneAndMutate());
    }

    shouldDelete(_particle)
    {
        if (_particle.shouldDelete)
            this.particles.splice(this.particles.indexOf(_particle), 1);
    }

    update()
    {
        for (const particle of this.particles)
        {
            particle.update();
            this.shouldDelete(particle);
        }

        if (frameCount % this.spawnRate === 0)
            this.spawnParticle();
    }

    draw(_canvas)
    {
        for (const particle of this.particles)
            particle.draw(_canvas);
    }
}
