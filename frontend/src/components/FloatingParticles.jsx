import { useEffect, useState, useCallback, memo } from 'react';
import './FloatingParticles.css';

const PARTICLE_COUNT = 25;
const SYMBOLS = ['❤', '♥', '🌸', '✿', '❀', '💕', '🌹'];

function generateParticle(id) {
  return {
    id,
    symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    left: Math.random() * 100,
    animationDuration: 8 + Math.random() * 12,
    animationDelay: Math.random() * 10,
    size: 0.6 + Math.random() * 1,
    opacity: 0.15 + Math.random() * 0.35,
    drift: -30 + Math.random() * 60,
  };
}

const Particle = memo(({ particle }) => (
  <span
    className="particle"
    style={{
      left: `${particle.left}%`,
      animationDuration: `${particle.animationDuration}s`,
      animationDelay: `${particle.animationDelay}s`,
      fontSize: `${particle.size}rem`,
      opacity: particle.opacity,
      '--drift': `${particle.drift}px`,
    }}
  >
    {particle.symbol}
  </span>
));

Particle.displayName = 'Particle';

function FloatingParticles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generated = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      generated.push(generateParticle(i));
    }
    setParticles(generated);
  }, []);

  return (
    <div className="floating-particles" aria-hidden="true">
      {particles.map((p) => (
        <Particle key={p.id} particle={p} />
      ))}
    </div>
  );
}

export default FloatingParticles;
