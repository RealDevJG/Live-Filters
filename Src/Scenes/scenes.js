const snowParticlePos = new p5.Vector(imgWidth / 4, -10);
const snowParticleDir = new p5.Vector(1, 1);
const snowParticleSpeed = new p5.Vector(0.5, 0.5);
// const snowParticleSpeed = new p5.Vector(0.3, 0.3);

const snowParticleSize = 8;
const snowParticleColour = "#FFFFFF";

const snowParticleTTL = 15;
const snowParticleSpawnRate = 5; // TODO change so a higher number makes them spawn more instead of lower

const snowParticle = new Particle(snowParticlePos, snowParticleDir, snowParticleSpeed, snowParticleSize, snowParticleColour, snowParticleTTL, true);
const snowEmitter = new Emitter(snowParticlePos, snowParticleDir, snowParticle, snowParticleSpawnRate);

const snowyScene = new Scene([snowEmitter]);
