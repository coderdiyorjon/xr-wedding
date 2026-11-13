import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './CountdownSection.css';

const WEDDING_DATE = new Date('2026-12-06T18:00:00+05:00').getTime();

function getTimeLeft() {
  const now = Date.now();
  const diff = WEDDING_DATE - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: 'Kunlar' },
    { value: timeLeft.hours, label: 'Soatlar' },
    { value: timeLeft.minutes, label: 'Daqiqalar' },
    { value: timeLeft.seconds, label: 'Soniyalar' },
  ];

  return (
    <section className="countdown" ref={ref}>
      <motion.div
        className="countdown__container"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="countdown__ornament"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          ✦
        </motion.div>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          To'y kunigacha
        </motion.h2>

        <div className="ornament">
          <span className="ornament-line" />
          <span className="ornament-symbol">⏳</span>
          <span className="ornament-line" />
        </div>

        <div className="countdown__grid">
          {timeUnits.map((unit, index) => (
            <motion.div
              className="countdown__card"
              key={unit.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <div className="countdown__card-inner">
                <motion.span
                  className="countdown__number"
                  key={unit.value}
                  initial={{ scale: 1.1, opacity: 0.7 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {String(unit.value).padStart(2, '0')}
                </motion.span>
                <span className="countdown__label">{unit.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default CountdownSection;
