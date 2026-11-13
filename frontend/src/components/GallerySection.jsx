import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './GallerySection.css';

const placeholders = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  src: `/images/photo${i + 1}.jpg`,
}));

function GallerySection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="gallery" ref={ref}>
      <div className="gallery__container">
        <motion.div
          className="gallery__ornament"
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
          Bizning sevgi hikoyamiz
        </motion.h2>

        <div className="ornament">
          <span className="ornament-line" />
          <span className="ornament-symbol">📸</span>
          <span className="ornament-line" />
        </div>

        <div className="gallery__grid">
          {placeholders.map((photo, index) => (
            <motion.div
              className="gallery__item"
              key={photo.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <div className="gallery__image-wrapper">
                <img
                  src={photo.src}
                  alt={`Rasm ${photo.id}`}
                  className="gallery__image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="gallery__placeholder">
                  <span className="gallery__placeholder-icon">🖼️</span>
                  <span className="gallery__placeholder-text">Rasm qo'shiladi</span>
                </div>
              </div>
              <div className="gallery__item-overlay">
                <span className="gallery__item-number">{photo.id}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GallerySection;
