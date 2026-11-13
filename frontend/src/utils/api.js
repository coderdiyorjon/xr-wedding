const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

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
    throw new Error('RSVP yuborishda xatolik yuz berdi');
  }

  return response.json();
}

/**
 * Submit a congratulatory wish
 */
export async function submitWish({ name, message }) {
  const response = await fetch(`${API_URL}/api/wishes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, message }),
  });

  if (!response.ok) {
    throw new Error('Tabrik yuborishda xatolik yuz berdi');
  }

  return response.json();
}

/**
 * Fetch all wishes
 */
export async function fetchWishes() {
  const response = await fetch(`${API_URL}/api/wishes`);

  if (!response.ok) {
    throw new Error('Tabriklarni yuklashda xatolik yuz berdi');
  }

  return response.json();
}
