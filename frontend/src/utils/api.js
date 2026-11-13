/**
 * Resolve API base URL cleanly across:
 * - Separate frontend/backend Railway services (VITE_API_URL=https://...)
 * - Unified single-service deployments (same-origin /api)
 * - Local Vite dev server (proxied /api -> localhost:3001)
 */
export function resolveApiBaseUrl(rawUrl) {
  const trimmed = typeof rawUrl === 'string' ? rawUrl.trim().replace(/\/+$/, '') : '';
  if (!trimmed) return '';

  // Ignore localhost URLs so Vite's /api proxy or same-origin server handles local/sandbox requests
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(trimmed)) {
    return '';
  }

  return trimmed;
}

const envApiUrl =
  typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env.VITE_API_URL
    : '';
const API_URL = resolveApiBaseUrl(envApiUrl);

/**
 * Submit RSVP response
 */
export async function submitRSVP({ name, attending, guestCount }) {
  const response = await fetch(`${API_URL}/api/rsvp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, attending, guestCount }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || 'Javob yuborishda xatolik yuz berdi');
  }

  return response.json();
}

/**
 * Submit a congratulatory wish
 */
export async function submitWish({ name, message, website = '' }) {
  const response = await fetch(`${API_URL}/api/wishes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, message, website }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || 'Tabrik yuborishda xatolik yuz berdi');
  }

  return response.json();
}

/**
 * Fetch all wishes
 */
export async function fetchWishes() {
  const response = await fetch(`${API_URL}/api/wishes`);

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || 'Tabriklarni yuklashda xatolik yuz berdi');
  }

  return response.json();
}
