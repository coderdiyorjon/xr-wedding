import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Footer.css';

function Footer() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <footer className="footer" ref={ref}>
      <div className="footer__container">
        <motion.div
          className="footer__ornament"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="footer__ornament-line" />
          <span className="footer__ornament-diamond">◆</span>
          <span className="footer__ornament-line" />
        </motion.div>

        <motion.div
          className="footer__monogram"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="footer__letter">X</span>
          <span className="footer__heart">❤️</span>
          <span className="footer__letter">R</span>
        </motion.div>

        <motion.h3
          className="footer__names"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Xurshidjon & Ruxshonaoy
        </motion.h3>

        <motion.p
          className="footer__date"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          06.12.2026
        </motion.p>

        <motion.p
          className="footer__message"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Sizni kutib qolamiz! 🌹
        </motion.p>

        <motion.div
          className="footer__bottom-ornament"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          ✦ ✦ ✦
        </motion.div>

        <motion.p
          className="footer__copy"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Muhabbat bilan tayyorlangan 💕
        </motion.p>
      </div>
    </footer>
  );
}

export default Footer;
