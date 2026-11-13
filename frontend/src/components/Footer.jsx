import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BotanicalOrnament from './BotanicalOrnament';
import './Footer.css';

function Footer() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <footer className="footer" ref={ref}>
      <motion.div
        className="footer__container"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
      >
        <BotanicalOrnament variant="rose-crest" tone="dark" />

        <div className="footer__monogram">X &amp; R</div>

        <h3 className="footer__names">Xurshidjon &amp; Ruxshonaoy</h3>
        <p className="footer__date">06 · 12 · 2026</p>

        <div className="ornament" aria-hidden="true">
          <span className="ornament-line" />
          <span className="ornament-diamond" />
          <span className="ornament-line" />
        </div>

        <p className="footer__message">
          Sizni baxtli kunimizda samimiyat bilan kutib qolamiz
        </p>
      </motion.div>
    </footer>
  );
}

export default Footer;
