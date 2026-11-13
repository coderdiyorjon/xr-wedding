import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './LocationSection.css';

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=40.111520,67.856488';
const YANDEX_MAPS_URL =
  'https://yandex.uz/maps/org/dunyo_/221210299421/?ll=67.856488%2C40.111520&z=18.6';
const GOOGLE_EMBED_URL =
  'https://maps.google.com/maps?q=40.111520,67.856488&z=17&output=embed';

function LocationSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="location" ref={ref} aria-label="Marosim manzili va xarita">
      <div className="location__container">
        <p className="section-eyebrow">Geografik joylashuv</p>
        <h2 className="section-title">Manzil va yo&apos;nalish</h2>
        <p className="section-subtitle">
          Manzil: Dunyo Restaurant (40.111520, 67.856488)
        </p>

        <motion.div
          className="location__map-wrapper"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <iframe
            className="location__map"
            src={GOOGLE_EMBED_URL}
            title="Dunyo Restaurant joylashuvi xaritasi"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="location__map-badge" aria-hidden="true">
            <span className="location__map-dot" />
            <span>Dunyo Restaurant</span>
          </div>
        </motion.div>

        <motion.div
          className="location__buttons"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="location__btn location__btn--primary"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Google Maps orqali ochish
          </a>

          <a
            href={YANDEX_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="location__btn location__btn--secondary"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
            Yandex Maps orqali ochish
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default LocationSection;
