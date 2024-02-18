// This emitter class is responsible for spawning particles at its location and coordinating them
class Emitter
{
    constructor(_pos, _dir, _particleTemplate, _spawnRate)
    {
        // To keep track of every particle currently alive
        this.particles = [];

        // The position of the emitter and the direction it will emit particles
        this.pos = _pos;
        this.dir = _dir;

        // Spawn rate is how often it will spawn the particles, 
        // particleTemplate is a deactivated particle that is constantly cloned and variated to form the other emissions
        this.spawnRate = _spawnRate;
        this.particleTemplate = _particleTemplate;
    }

    // Clones and mutates the disabled particle and adds it to the active particles array
    spawnParticle()
    {
        this.particles.push(this.particleTemplate.cloneAndMutate());
    }

    // If a particle is marked that it should be deleted, it will be spliced out of the array so that it can be garbage collected
    // A particle is marked as shouldDelete if its time to live (TTL) has expired. TTL is handled within the particles themselves
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
            this.shouldDelete(particle); // Check if particle should be deleted, if so delete it
        }

        // Spawn particles based on the configured spawnRate
        if (frameCount % this.spawnRate === 0)
            this.spawnParticle();
    }

    draw(_canvas)
    {
        for (const particle of this.particles)
            particle.draw(_canvas);
    }
}
