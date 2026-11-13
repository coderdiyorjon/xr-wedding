import { motion } from 'framer-motion';
import './MusicToggle.css';

function MusicToggle({ isPlaying, hasError, onToggle }) {
  if (hasError) return null;

  const label = isPlaying ? "Musiqani o'chirish" : 'Musiqani yoqish';
  const statusText = isPlaying ? 'Musiqa' : "O'chirilgan";

  return (
    <motion.button
      type="button"
      className={`music-toggle ${isPlaying ? 'music-toggle--playing' : ''}`}
      onClick={onToggle}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.35 }}
      aria-label={label}
      aria-pressed={isPlaying}
      title={label}
    >
      <span className="music-toggle__icon-wrap" aria-hidden="true">
        {isPlaying ? (
          <svg viewBox="0 0 24 24" className="music-toggle__svg" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="music-toggle__svg" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
            <line x1="3" y1="3" x2="21" y2="21" />
          </svg>
        )}
      </span>
      <span className="music-toggle__text">{statusText}</span>
      {isPlaying && (
        <span className="music-toggle__bars" aria-hidden="true">
          <span className="music-toggle__bar" />
          <span className="music-toggle__bar" />
          <span className="music-toggle__bar" />
        </span>
      )}
    </motion.button>
  );
}

export default MusicToggle;
