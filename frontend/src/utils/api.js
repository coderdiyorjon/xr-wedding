// Always use same-origin /api routes (served by Express on port 3000 or proxied by Vite)
const API_URL = '';

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
