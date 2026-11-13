import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './EventDetails.css';

function EventDetails() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const details = [
    {
      icon: '📅',
      title: 'Sana',
      value: '2026-yil, 6-dekabr',
      sub: 'Yakshanba',
    },
    {
      icon: '🕕',
      title: 'Vaqt',
      value: 'Soat 18:00',
      sub: 'Kechki dastur',
    },
    {
      icon: '📍',
      title: 'Joy',
      value: 'Jizzax',
      sub: 'Manzil tez orada yangilanadi',
    },
  ];

  return (
    <section className="event" ref={ref}>
      <div className="event__container">
        <motion.div
          className="event__ornament"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          ✦ ✦ ✦
        </motion.div>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          To'y marosimi
        </motion.h2>

        <div className="ornament">
          <span className="ornament-line" />
          <span className="ornament-symbol">💒</span>
          <span className="ornament-line" />
        </div>

        <div className="event__cards">
          {details.map((detail, index) => (
            <motion.div
              className="event__card"
              key={detail.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
            >
              <div className="event__card-icon-wrapper">
                <span className="event__card-icon">{detail.icon}</span>
              </div>
              <h3 className="event__card-title">{detail.title}</h3>
              <p className="event__card-value">{detail.value}</p>
              <p className="event__card-sub">{detail.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Decorative bottom */}
        <motion.div
          className="event__bottom-ornament"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span className="event__bottom-line" />
          <span className="event__bottom-icon">❦</span>
          <span className="event__bottom-line" />
        </motion.div>
      </div>
    </section>
  );
}

export default EventDetails;
