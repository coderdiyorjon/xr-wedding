import { motion } from 'framer-motion';
import BotanicalOrnament from './BotanicalOrnament';
import './HeroSection.css';

function HeroSection() {
  return (
    <section className="cinematic-hero" aria-label="Asosiy taklifnoma sahifasi">
      {/* Warm golden backlighting behind couple portrait */}
      <div className="cinematic-hero__glow" aria-hidden="true" />

      {/* Backlit couple silhouette photograph (photo2.jpg) */}
      <div className="cinematic-hero__media" aria-hidden="true">
        <img
          src="/images/photo2.jpg"
          alt="Xurshidjon va Ruxshonaoy raqs tushmoqda"
          className="cinematic-hero__image"
        />
        <div className="cinematic-hero__vignette" />
      </div>

      {/* Delicate editorial border and corner rose botanicals */}
      <div className="cinematic-hero__border" aria-hidden="true" />
      <div className="cinematic-hero__floral cinematic-hero__floral--tl" aria-hidden="true">
        <BotanicalOrnament variant="corner" tone="dark" />
      </div>
      <div className="cinematic-hero__floral cinematic-hero__floral--tr" aria-hidden="true">
        <BotanicalOrnament variant="corner" tone="dark" />
      </div>
      <div className="cinematic-hero__floral cinematic-hero__floral--bl" aria-hidden="true">
        <BotanicalOrnament variant="corner" tone="dark" />
      </div>
      <div className="cinematic-hero__floral cinematic-hero__floral--br" aria-hidden="true">
        <BotanicalOrnament variant="corner" tone="dark" />
      </div>

      {/* Editorial Typography Overlay */}
      <div className="cinematic-hero__content">
        <motion.p
          className="cinematic-hero__eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          Nikoh to&apos;yi taklifnomasi
        </motion.p>

        <motion.div
          className="cinematic-hero__titles"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
        >
          <span className="cinematic-hero__monogram">X &amp; R</span>
          <h1 className="cinematic-hero__names">
            Xurshidjon <span className="cinematic-hero__amp">&amp;</span> Ruxshonaoy
          </h1>
          <div className="cinematic-hero__rule" aria-hidden="true">
            <span className="cinematic-hero__rule-line" />
            <span className="cinematic-hero__rule-dot" />
            <span className="cinematic-hero__rule-line" />
          </div>
          <p className="cinematic-hero__date">06.12.2026</p>
        </motion.div>

        <motion.div
          className="cinematic-hero__scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.8 }}
        >
          <span className="cinematic-hero__scroll-text">Pastga suring</span>
          <span className="cinematic-hero__scroll-line" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
