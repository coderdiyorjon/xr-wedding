import { useMemo } from 'react';
import './FloatingParticles.css';

const PARTICLE_COUNT = 14;

function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, id) => ({
        id,
        left: ((id * 7.3 + 4) % 96).toFixed(1),
        duration: 12 + (id % 5) * 3,
        delay: (id % 6) * 1.8,
        size: 2 + (id % 3),
        opacity: 0.14 + (id % 4) * 0.06,
      })),
    []
  );

  return (
    <div className="floating-particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

export default FloatingParticles;
