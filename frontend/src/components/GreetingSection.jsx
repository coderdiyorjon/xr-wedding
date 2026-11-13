import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import BotanicalOrnament from './BotanicalOrnament';
import './GreetingSection.css';

function GreetingSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="greeting" ref={ref} aria-label="Fotiha to'yi taklifnomasi matni">
      <motion.article
        className="greeting__card"
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Double Gold Inner Hairline Frame */}
        <div className="greeting__inner-frame" aria-hidden="true" />

        {/* Corner Rose Botanical Illustrations */}
        <div className="greeting__corner greeting__corner--tl" aria-hidden="true">
          <BotanicalOrnament variant="corner" tone="light" />
        </div>
        <div className="greeting__corner greeting__corner--tr" aria-hidden="true">
          <BotanicalOrnament variant="corner" tone="light" />
        </div>
        <div className="greeting__corner greeting__corner--bl" aria-hidden="true">
          <BotanicalOrnament variant="corner" tone="light" />
        </div>
        <div className="greeting__corner greeting__corner--br" aria-hidden="true">
          <BotanicalOrnament variant="corner" tone="light" />
        </div>

        <div className="greeting__body">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <BotanicalOrnament variant="rose-crest" tone="light" />
          </motion.div>

          <motion.span
            className="greeting__monogram"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            X &amp; R
          </motion.span>

          <motion.h2
            className="greeting__heading"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            HURMATLI MEHMONLAR!
          </motion.h2>

          <BotanicalOrnament variant="divider" tone="light" />

          <motion.p
            className="greeting__text"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Bu yil hayotimizdagi eng go&apos;zal kunlardan biri bo&apos;ladi. Uni
            yaqinlarimiz va do&apos;stlarimiz davrasida o&apos;tkazishni xohlaymiz.
            Katta mamnuniyat bilan sizni fotiha to&apos;yimizga taklif qilamiz!
          </motion.p>

          <motion.p
            className="greeting__signature"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            Samimiy hurmat bilan,
            <span className="greeting__signature-names">Xurshidjon &amp; Ruxshonaoy</span>
          </motion.p>
        </div>
      </motion.article>
    </section>
  );
}

export default GreetingSection;
