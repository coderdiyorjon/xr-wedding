// 2026-yil 21-noyabr, soat 13:00 (Asia/Tashkent, UTC+05:00)
export const WEDDING_ISO_TASHKENT = '2026-11-21T13:00:00+05:00';
export const WEDDING_TIMESTAMP = new Date(WEDDING_ISO_TASHKENT).getTime();

/**
 * Calculate remaining time until targetMs from nowMs.
 */
export function calculateTimeLeft(nowMs = Date.now(), targetMs = WEDDING_TIMESTAMP) {
  const diff = targetMs - nowMs;

  if (!Number.isFinite(diff) || diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPassed: true,
    };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPassed: false,
  };
}

/**
 * Pad countdown digits to at least 2 characters.
 */
export function formatCountdownUnit(value) {
  return String(Math.max(0, Math.floor(Number(value) || 0))).padStart(2, '0');
}
