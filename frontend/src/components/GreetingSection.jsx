import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './GreetingSection.css';

function GreetingSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="greeting" ref={ref}>
      <div className="greeting__container">
        {/* Top decorative border */}
        <motion.div
          className="greeting__corner-ornament greeting__corner-ornament--top-left"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          ❧
        </motion.div>
        <motion.div
          className="greeting__corner-ornament greeting__corner-ornament--top-right"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          ❧
        </motion.div>

        <motion.div
          className="greeting__ornament-top"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          ✦ ✦ ✦
        </motion.div>

        <motion.h2
          className="greeting__heading"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hurmatli mehmonimiz!
        </motion.h2>

        <motion.div
          className="greeting__divider"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="greeting__divider-line" />
          <span className="greeting__divider-icon">💍</span>
          <span className="greeting__divider-line" />
        </motion.div>

        <motion.p
          className="greeting__text"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Bizning hayotimizning eng muhim va baxtli kuniga
          <br />
          Sizni taklif qilishdan mamnunmiz!
        </motion.p>

        <motion.p
          className="greeting__text greeting__text--secondary"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Ushbu quvonchli kunimizda Sizni yonimizda ko'rishni
          <br />
          chin dildan istaymiz.
        </motion.p>

        <motion.div
          className="greeting__ornament-bottom"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          ❦
        </motion.div>

        {/* Bottom corner ornaments */}
        <motion.div
          className="greeting__corner-ornament greeting__corner-ornament--bottom-left"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          ❧
        </motion.div>
        <motion.div
          className="greeting__corner-ornament greeting__corner-ornament--bottom-right"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          ❧
        </motion.div>
      </div>
    </section>
  );
}

export default GreetingSection;
