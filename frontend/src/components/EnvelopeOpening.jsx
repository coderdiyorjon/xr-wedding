import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './EnvelopeOpening.css';

function EnvelopeOpening({ onOpen, isOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleEnvelopeClick = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);

    // Give time for the 3D flap opening and card rise animation before revealing the website
    setTimeout(() => {
      onOpen();
    }, 1400);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="envelope-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="envelope-backdrop" />

          {/* Ambient decorative particles */}
          <div className="envelope-ambient-glow" />

          <div
            className={`envelope-wrapper ${isOpening ? 'is-opening' : ''}`}
            onClick={handleEnvelopeClick}
            role="button"
            tabIndex={0}
            aria-label="Taklifnomani ochish uchun bosing"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleEnvelopeClick();
              }
            }}
          >
            {/* Top hint */}
            <motion.div
              className="envelope-hint"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="envelope-hint-icon">✦</span>
              <span className="envelope-hint-text">Taklifnomani ochish uchun bosing</span>
              <span className="envelope-hint-icon">✦</span>
            </motion.div>

            {/* The 3D Envelope Container */}
            <div className="envelope">
              {/* Back paper base */}
              <div className="envelope-back" />

              {/* Invitation card sliding out */}
              <div className="envelope-card">
                <div className="envelope-card-inner">
                  <div className="envelope-card-border" />
                  <div className="envelope-card-monogram">X & R</div>
                  <div className="envelope-card-names">Xurshidjon & Ruxshonaoy</div>
                  <div className="envelope-card-date">06.12.2026</div>
                  <div className="envelope-card-quote">To'y taklifnomasi</div>
                </div>
              </div>

              {/* Left and Right inner pocket folds */}
              <div className="envelope-fold-left" />
              <div className="envelope-fold-right" />

              {/* Bottom fold pocket */}
              <div className="envelope-fold-bottom" />

              {/* Top triangular flap with 3D folding */}
              <div className="envelope-flap" />

              {/* Center Golden Wax Seal Button (inspired by reference image) */}
              <div className="envelope-seal">
                <div className="seal-outer-rim">
                  <div className="seal-stitched-circle" />
                  <div className="seal-inner-body">
                    <span className="seal-monogram">X & R</span>
                  </div>
                </div>
                <div className="seal-glow" />
              </div>
            </div>

            {/* Subtitle below envelope */}
            <motion.p
              className="envelope-caption"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Xurshidjon & Ruxshonaoy
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EnvelopeOpening;
