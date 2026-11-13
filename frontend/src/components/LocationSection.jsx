import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './LocationSection.css';

function LocationSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const googleMapsUrl =
    'https://www.google.com/maps/place/40%C2%B009\'17.3%22N+67%C2%B048\'53.9%22E/@40.1548066,67.8143285,300m';
  const yandexMapsUrl =
    'https://yandex.uz/maps/21606/jizzakh/?ll=67.815084%2C40.154812&mode=search&sll=67.814961%2C40.154811&text=40.154811%2C67.814961&z=21';
  const googleEmbedUrl =
    'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d800!2d67.8149!3d40.1548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1700000000000';

  return (
    <section className="location" ref={ref}>
      <div className="location__container">
        <motion.div
          className="location__ornament"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          ✦
        </motion.div>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Manzil
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          To'yxonaning joylashuvi
        </motion.p>

        {/* Map embed */}
        <motion.div
          className="location__map-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <iframe
            className="location__map"
            src={googleEmbedUrl}
            title="To'yxona joylashuvi"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="location__buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="location__btn location__btn--google"
          >
            <span className="location__btn-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            Google Xaritada ochish
          </a>
          <a
            href={yandexMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="location__btn location__btn--yandex"
          >
            <span className="location__btn-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            Yandex Xaritada ochish
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default LocationSection;
