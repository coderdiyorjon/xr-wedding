import { motion, AnimatePresence } from 'framer-motion';
import './HeroSection.css';

function HeroSection({ onOpen, isOpen }) {
  return (
    <section className={`hero ${isOpen ? 'hero--collapsed' : ''}`}>
      {/* Background decorative elements */}
      <div className="hero__bg-pattern" />
      <div className="hero__bg-overlay" />

      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="hero__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            {/* Top ornament */}
            <motion.div
              className="hero__top-ornament"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              ✦
            </motion.div>

            {/* Monogram */}
            <motion.div
              className="hero__monogram"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <span className="hero__monogram-letter">X</span>
              <span className="hero__monogram-ampersand">&</span>
              <span className="hero__monogram-letter">R</span>
            </motion.div>

            {/* Decorative line */}
            <motion.div
              className="hero__divider"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
            >
              <span className="hero__divider-line" />
              <span className="hero__divider-diamond">◆</span>
              <span className="hero__divider-line" />
            </motion.div>

            {/* Full Names */}
            <motion.h1
              className="hero__names"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              Xurshidjon
              <span className="hero__names-and">&</span>
              Ruxshonaoy
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="hero__subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              Biz turmush quramiz!
            </motion.p>

            {/* Bottom ornament */}
            <motion.div
              className="hero__bottom-ornament"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <span className="hero__ornament-line" />
              <span className="hero__ornament-heart">♥</span>
              <span className="hero__ornament-line" />
            </motion.div>

            {/* CTA Button */}
            <motion.button
              className="hero__cta"
              onClick={onOpen}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="hero__cta-icon">💌</span>
              Taklifnomani ochish
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default HeroSection;
