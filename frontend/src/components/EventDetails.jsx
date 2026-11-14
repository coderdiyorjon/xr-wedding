import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BotanicalOrnament from './BotanicalOrnament';
import './EventDetails.css';

function EventDetails() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const details = [
    {
      label: 'Sana',
      value: '2026-yil, 21-noyabr',
      sub: 'Shanba kuni',
    },
    {
      label: 'Vaqt',
      value: 'Soat 13:00',
      sub: 'Jizzax vaqti bilan',
    },
    {
      label: 'Manzil',
      value: 'Dunyo Restaurant',
      sub: '40.111520, 67.856488',
    },
  ];

  return (
    <section className="event" ref={ref} aria-label="Fotiha to'yi marosimi tafsilotlari">
      <div className="event__container">
        <p className="section-eyebrow">Xurshidjon &amp; Ruxshonaoy</p>
        <h2 className="section-title">Marosim tafsilotlari</h2>

        <BotanicalOrnament variant="divider" tone="light" />

        {/* Architectural Date Plaque */}
        <motion.div
          className="event__date-plaque"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="event__date-month">Noyabr</span>
          <div className="event__date-center">
            <span className="event__date-dayname">Shanba</span>
            <span className="event__date-number">21</span>
            <span className="event__date-year">2026</span>
          </div>
          <span className="event__date-time">13:00</span>
        </motion.div>

        <div className="event__columns">
          {details.map((detail, index) => (
            <motion.div
              className="event__column"
              key={detail.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + index * 0.12 }}
            >
              <span className="event__column-label">{detail.label}</span>
              <p className="event__column-value">{detail.value}</p>
              <p className="event__column-sub">{detail.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EventDetails;
