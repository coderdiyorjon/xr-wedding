import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { calculateTimeLeft, formatCountdownUnit } from '../utils/countdown';
import './CountdownSection.css';

function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: 'Kun' },
    { value: timeLeft.hours, label: 'Soat' },
    { value: timeLeft.minutes, label: 'Daqiqa' },
    { value: timeLeft.seconds, label: 'Soniya' },
  ];

  return (
    <section className="countdown" ref={ref} aria-label="To'y kunigacha qolgan vaqt">
      <div className="countdown__glow" aria-hidden="true" />
      <motion.div
        className="countdown__container"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="section-eyebrow">Jizzax vaqti bilan · 21.11.2026</p>
        <h2 className="section-title section-title--light">
          Baxtli kunimizgacha
        </h2>

        <div className="ornament" aria-hidden="true">
          <span className="ornament-line" />
          <span className="ornament-diamond" />
          <span className="ornament-line" />
        </div>

        <p className="countdown__couple">Xurshidjon &amp; Ruxshonaoy</p>

        {timeLeft.isPassed ? (
          <p className="countdown__passed">
            Baxtli to&apos;y kunimiz yetib keldi!
          </p>
        ) : (
          <div className="countdown__grid" role="timer" aria-live="polite">
            {timeUnits.map((unit, index) => (
              <motion.div
                className="countdown__item"
                key={unit.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.15 + index * 0.08 }}
              >
                <span className="countdown__number">
                  {formatCountdownUnit(unit.value)}
                </span>
                <span className="countdown__rule" aria-hidden="true" />
                <span className="countdown__label">{unit.label}</span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}

export default CountdownSection;
