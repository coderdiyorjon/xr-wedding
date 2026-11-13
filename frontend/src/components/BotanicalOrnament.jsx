import './BotanicalOrnament.css';

/**
 * Refined bespoke botanical rose & gold-leaf SVG ornaments.
 * variant: 'corner' | 'rose-crest' | 'divider'
 * tone: 'dark' (for #080706 surfaces) | 'light' (for #F8F5EF ivory surfaces)
 */
function BotanicalOrnament({ variant = 'corner', tone = 'dark', className = '' }) {
  const petalFill = tone === 'dark' ? 'rgba(248, 245, 239, 0.08)' : 'rgba(217, 166, 168, 0.24)';
  const roseAccent = tone === 'dark' ? 'rgba(217, 166, 168, 0.35)' : 'rgba(217, 166, 168, 0.55)';
  const stemStroke = tone === 'dark' ? 'rgba(185, 154, 98, 0.58)' : 'rgba(185, 154, 98, 0.72)';
  const leafFill = tone === 'dark' ? 'rgba(216, 189, 145, 0.14)' : 'rgba(185, 154, 98, 0.16)';

  if (variant === 'divider') {
    return (
      <div className={`botanical-divider ${className}`} aria-hidden="true">
        <span className="botanical-divider__line" />
        <svg viewBox="0 0 64 28" className="botanical-divider__svg" fill="none">
          <path
            d="M4 14C14 14 20 8 26 14C20 20 14 14 4 14Z"
            fill={leafFill}
            stroke={stemStroke}
            strokeWidth="0.9"
          />
          <path
            d="M60 14C50 14 44 8 38 14C44 20 50 14 60 14Z"
            fill={leafFill}
            stroke={stemStroke}
            strokeWidth="0.9"
          />
          <circle cx="32" cy="14" r="6" fill={petalFill} stroke={roseAccent} strokeWidth="0.9" />
          <path
            d="M29 14C29 11.5 34.5 11.5 34.5 14C34.5 16.2 31 16.8 30.2 14.8"
            stroke={stemStroke}
            strokeWidth="0.95"
            strokeLinecap="round"
          />
        </svg>
        <span className="botanical-divider__line" />
      </div>
    );
  }

  if (variant === 'rose-crest') {
    return (
      <svg
        viewBox="0 0 180 64"
        fill="none"
        className={`botanical-crest ${className}`}
        aria-hidden="true"
      >
        <path
          d="M12 42C44 36 66 22 90 22C114 22 136 36 168 42"
          stroke={stemStroke}
          strokeWidth="1"
        />
        <path
          d="M38 35C46 22 58 21 63 31C54 36 45 37 38 35Z"
          fill={leafFill}
          stroke={stemStroke}
          strokeWidth="0.85"
        />
        <path
          d="M142 35C134 22 122 21 117 31C126 36 135 37 142 35Z"
          fill={leafFill}
          stroke={stemStroke}
          strokeWidth="0.85"
        />
        {/* Central delicate rose */}
        <circle cx="90" cy="24" r="13" fill={petalFill} stroke={roseAccent} strokeWidth="1" />
        <circle cx="84" cy="22" r="8" fill={petalFill} stroke={stemStroke} strokeWidth="0.8" />
        <circle cx="96" cy="22" r="8" fill={petalFill} stroke={stemStroke} strokeWidth="0.8" />
        <path
          d="M86 24C86 19.5 94 19.5 94 24C94 27.5 88.5 28.5 87.5 25.5"
          stroke={stemStroke}
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* Side rose buds */}
        <circle cx="67" cy="29" r="6.5" fill={petalFill} stroke={roseAccent} strokeWidth="0.85" />
        <circle cx="113" cy="29" r="6.5" fill={petalFill} stroke={roseAccent} strokeWidth="0.85" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 260 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`botanical-corner ${className}`}
      aria-hidden="true"
    >
      {/* Flowing golden stems */}
      <path
        d="M8 12C54 44 92 98 98 168C101 200 94 224 82 246"
        stroke={stemStroke}
        strokeWidth="1.2"
      />
      <path
        d="M14 18C68 38 134 46 218 28"
        stroke={stemStroke}
        strokeWidth="1"
      />
      <path
        d="M42 42C86 76 142 94 196 92"
        stroke={stemStroke}
        strokeWidth="0.85"
        strokeOpacity="0.7"
      />

      {/* Leaves */}
      <path d="M52 38C68 20 92 22 98 38C80 48 62 46 52 38Z" fill={leafFill} stroke={stemStroke} strokeWidth="0.85" />
      <path d="M126 38C144 22 168 26 174 42C155 48 138 45 126 38Z" fill={leafFill} stroke={stemStroke} strokeWidth="0.85" />
      <path d="M84 128C104 114 126 122 128 140C108 146 92 138 84 128Z" fill={leafFill} stroke={stemStroke} strokeWidth="0.85" />
      <path d="M68 184C52 198 54 220 70 226C78 208 76 194 68 184Z" fill={leafFill} stroke={stemStroke} strokeWidth="0.85" />

      {/* Main layered rose bloom */}
      <g transform="translate(82, 76)">
        <circle cx="0" cy="0" r="26" fill={petalFill} stroke={roseAccent} strokeWidth="1" />
        <ellipse cx="-10" cy="-4" rx="14" ry="11" transform="rotate(-22 -10 -4)" fill={petalFill} stroke={stemStroke} strokeWidth="0.8" />
        <ellipse cx="11" cy="-2" rx="13" ry="10" transform="rotate(24 11 -2)" fill={petalFill} stroke={stemStroke} strokeWidth="0.8" />
        <ellipse cx="0" cy="9" rx="14" ry="10" fill={petalFill} stroke={roseAccent} strokeWidth="0.8" />
        <path
          d="M-6 0C-6 -6 6 -6 6 0C6 5 -2 6 -3 1"
          stroke={stemStroke}
          strokeWidth="1.05"
          strokeLinecap="round"
        />
      </g>

      {/* Secondary rose bud */}
      <g transform="translate(166, 62)">
        <circle cx="0" cy="0" r="14" fill={petalFill} stroke={roseAccent} strokeWidth="0.9" />
        <path
          d="M-4 0C-4 -4 4 -4 4 0C4 3 -1 4 -2 1"
          stroke={stemStroke}
          strokeWidth="0.9"
          strokeLinecap="round"
        />
      </g>

      {/* Lower rose bud */}
      <g transform="translate(96, 166)">
        <circle cx="0" cy="0" r="12" fill={petalFill} stroke={roseAccent} strokeWidth="0.85" />
        <path
          d="M-3 0C-3 -3 3 -3 3 0C3 2.5 -1 3 -1.5 0.5"
          stroke={stemStroke}
          strokeWidth="0.85"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export default BotanicalOrnament;
