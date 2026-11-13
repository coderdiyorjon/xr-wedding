import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BotanicalOrnament from './BotanicalOrnament';
import './EnvelopeOpening.css';

function EnvelopeOpening({ onOpen, isOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleEnvelopeClick = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setTimeout(
      () => {
        onOpen();
      },
      prefersReducedMotion ? 150 : 1250
    );
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.section
          className="envelope-screen"
          aria-label="To'y taklifnomasi konverti"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Warm golden candlelight glow */}
          <div className="envelope-ambient-glow" aria-hidden="true" />
          <div className="envelope-frame" aria-hidden="true" />

          {/* Corner rose botanical illustrations */}
          <div className="envelope-floral envelope-floral--tl" aria-hidden="true">
            <BotanicalOrnament variant="corner" tone="dark" />
          </div>
          <div className="envelope-floral envelope-floral--br" aria-hidden="true">
            <BotanicalOrnament variant="corner" tone="dark" />
          </div>

          <div className="envelope-stage">
            <motion.div
              className="envelope-intro"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <p className="envelope-eyebrow">06 · 12 · 2026</p>
              <p className="envelope-message">
                Sizni hayotimizning eng go&apos;zal va unutilmas kuniga taklif etamiz
              </p>
            </motion.div>

            {/* Interactive 3D Envelope */}
            <div
              className={`envelope-wrapper ${isOpening ? 'is-opening' : ''}`}
              onClick={handleEnvelopeClick}
            >
              <div className="envelope" aria-hidden="true">
                <div className="envelope-back" />

                {/* Emerging Invitation Card */}
                <div className="envelope-card">
                  <div className="envelope-card-inner">
                    <span className="envelope-card-eyebrow">Nikoh marosimi</span>
                    <div className="envelope-card-monogram">X &amp; R</div>
                    <div className="envelope-card-names">Xurshidjon &amp; Ruxshonaoy</div>
                    <div className="envelope-card-divider" />
                    <div className="envelope-card-date">2026-yil, 6-dekabr</div>
                  </div>
                </div>

                {/* Envelope Pockets */}
                <div className="envelope-fold-left" />
                <div className="envelope-fold-right" />
                <div className="envelope-fold-bottom" />

                {/* 3D Rotating Flap */}
                <div className="envelope-flap" />

                {/* Gold Wax Seal */}
                <div className="envelope-seal">
                  <div className="seal-outer-rim">
                    <div className="seal-stitched-circle" />
                    <div className="seal-inner-body">
                      <span className="seal-monogram">X&amp;R</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Accessible Primary Action Button */}
            <motion.button
              type="button"
              className="envelope-open-btn"
              onClick={handleEnvelopeClick}
              disabled={isOpening}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
            >
              <span className="envelope-open-btn__line" aria-hidden="true" />
              <span className="envelope-open-btn__text">Taklifnomani ochish</span>
              <span className="envelope-open-btn__line" aria-hidden="true" />
            </motion.button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default EnvelopeOpening;
