export const WISH_COOLDOWN_MS = 15_000;

/**
 * Validate congratulatory wish inputs and return localized Uzbek error messages.
 */
export function validateWishInput({ name, message }) {
  const trimmedName = typeof name === 'string' ? name.trim() : '';
  const trimmedMessage = typeof message === 'string' ? message.trim() : '';

  if (trimmedName.length < 2) {
    return {
      valid: false,
      error: "Iltimos, ism-familiyangizni kiriting (kamida 2 ta belgi).",
    };
  }

  if (trimmedName.length > 80) {
    return {
      valid: false,
      error: "Ism-familiya 80 ta belgidan oshmasligi kerak.",
    };
  }

  if (trimmedMessage.length < 3) {
    return {
      valid: false,
      error: "Iltimos, samimiy tilagingizni yozing (kamida 3 ta belgi).",
    };
  }

  if (trimmedMessage.length > 600) {
    return {
      valid: false,
      error: "Tilak matni 600 ta belgidan oshmasligi kerak.",
    };
  }

  return {
    valid: true,
    error: '',
    cleaned: {
      name: trimmedName,
      message: trimmedMessage,
    },
  };
}

/**
 * Enforce client-side anti-spam cooldown between submissions.
 */
export function checkWishCooldown(lastSubmitMs, nowMs = Date.now(), cooldownMs = WISH_COOLDOWN_MS) {
  if (!lastSubmitMs) {
    return { allowed: true, remainingSeconds: 0 };
  }

  const elapsed = nowMs - lastSubmitMs;
  if (elapsed >= cooldownMs) {
    return { allowed: true, remainingSeconds: 0 };
  }

  return {
    allowed: false,
    remainingSeconds: Math.ceil((cooldownMs - elapsed) / 1000),
  };
}
