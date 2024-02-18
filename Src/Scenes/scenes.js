// All of these variables are written as constants to avoid "magic numbers" and to make them more descriptive instead of just seeing
// new Scene("", vec(...), vec(...), vec(...), 8, "#FFFFFF", 15, 5, particle, emitter) as this would make it harder to know what each parameter is

// Snow Scene
const snowParticlePos = new p5.Vector(imgWidth / 4, -10);
const snowParticleDir = new p5.Vector(1, 1);
const snowParticleSpeed = new p5.Vector(0.5, 0.5);

const snowParticleSize = 8;
const snowParticleColour = "#FFFFFF";

const snowParticleTTL = 15;
const snowParticleSpawnRate = 5;

const snowParticle = new Particle(snowParticlePos, snowParticleDir, snowParticleSpeed, snowParticleSize, snowParticleColour, snowParticleTTL, true);
const snowEmitter = new Emitter(snowParticlePos, snowParticleDir, snowParticle, snowParticleSpawnRate);

const snowyScene = new Scene("Snowy Scene", [snowEmitter], [greyscaleFilter]);


// Lava Bubbles Scene
const lavaBubbleParticlePos = new p5.Vector(imgWidth / 2, imgHeight + 50);
const lavaBubbleParticleDir = new p5.Vector(0, -1);
const lavaBubbleParticleSpeed = new p5.Vector(0.5, 0.1);

const lavaBubbleParticleSize = 8;
const lavaBubbleParticleColour = `#FFDB0060`;

const lavaBubbleParticleTTL = 10;
const lavaBubbleParticleSpawnRate = 5;

const lavaBubbleParticle = new Particle(lavaBubbleParticlePos, lavaBubbleParticleDir, lavaBubbleParticleSpeed, lavaBubbleParticleSize, lavaBubbleParticleColour, lavaBubbleParticleTTL, true);
const lavaBubbleEmitter = new Emitter(lavaBubbleParticlePos, lavaBubbleParticleDir, lavaBubbleParticle, lavaBubbleParticleSpawnRate);

const lavaBubbleScene = new Scene("Lava Bubble Scene", [lavaBubbleEmitter], [maskChannelFilter(0x770000FF)]);
