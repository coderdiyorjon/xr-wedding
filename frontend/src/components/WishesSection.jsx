import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { submitWish, fetchWishes } from '../utils/api';
import { validateWishInput, checkWishCooldown } from '../utils/wishValidation';
import BotanicalOrnament from './BotanicalOrnament';
import './WishesSection.css';

function WishesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [wishes, setWishes] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [form, setForm] = useState({ name: '', message: '', website: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const lastSubmitTimeRef = useRef(0);

  useEffect(() => {
    loadWishes();
  }, []);

  const loadWishes = async () => {
    try {
      setIsLoadingList(true);
      const data = await fetchWishes();
      setWishes(Array.isArray(data) ? data : []);
    } catch {
      // Keep UI usable even if initial wishes fetch fails
    } finally {
      setIsLoadingList(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const validation = validateWishInput(form);
    if (!validation.valid) {
      setStatus('error');
      setErrorMsg(validation.error);
      return;
    }

    const cooldown = checkWishCooldown(lastSubmitTimeRef.current);
    if (!cooldown.allowed) {
      setStatus('error');
      setErrorMsg(
        `Iltimos, yangi tilak yuborishdan oldin ${cooldown.remainingSeconds} soniya kuting.`
      );
      return;
    }

    setStatus('loading');

    try {
      const created = await submitWish({
        name: validation.cleaned.name,
        message: validation.cleaned.message,
        website: form.website,
      });
      lastSubmitTimeRef.current = Date.now();
      setStatus('success');
      setForm({ name: '', message: '', website: '' });

      if (created && created.id) {
        setWishes((prev) => [created, ...prev]);
      } else {
        await loadWishes();
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || "Tilakni yuborishda xatolik yuz berdi.");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const normalized =
      typeof dateStr === 'string' && !dateStr.includes('T')
        ? `${dateStr.replace(' ', 'T')}Z`
        : dateStr;
    const date = new Date(normalized);
    if (Number.isNaN(date.getTime())) return '';

    const months = [
      'yanvar',
      'fevral',
      'mart',
      'aprel',
      'may',
      'iyun',
      'iyul',
      'avgust',
      'sentabr',
      'oktabr',
      'noyabr',
      'dekabr',
    ];

    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Tashkent',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    const parts = formatter.formatToParts(date);
    const year = parts.find((p) => p.type === 'year')?.value;
    const monthIndex = Number(parts.find((p) => p.type === 'month')?.value) - 1;
    const day = Number(parts.find((p) => p.type === 'day')?.value);
    const monthName = months[monthIndex] || '';

    return `${year}-yil, ${day}-${monthName}`;
  };

  return (
    <section className="wishes" ref={ref} aria-label="Ezgu tilaklar bo'limi">
      <div className="wishes__container">
        <p className="section-eyebrow">Samimiy tabriklar</p>
        <h2 className="section-title">Ezgu tilaklaringizni qoldiring</h2>
        <p className="section-subtitle">
          Biz uchun ushbu quvonchli kunda bildirgan samimiy tilaklaringiz juda qadrli.
        </p>

        <BotanicalOrnament variant="divider" tone="light" />

        {/* Editorial Wish Form */}
        <motion.div
          className="wishes__form-wrapper"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <form className="wishes__form" onSubmit={handleSubmit} noValidate>
            {/* Anti-spam honeypot field */}
            <div className="wishes__honeypot" aria-hidden="true">
              <label htmlFor="wish-website">Veb-sayt</label>
              <input
                id="wish-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
              />
            </div>

            <div className="wishes__field">
              <label className="wishes__label" htmlFor="wish-name">
                Ism-familiya
              </label>
              <input
                id="wish-name"
                type="text"
                className="wishes__input"
                placeholder="Ism-familiyangizni kiriting"
                maxLength={80}
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  if (status === 'error') setStatus('idle');
                }}
                required
              />
            </div>

            <div className="wishes__field">
              <label className="wishes__label" htmlFor="wish-message">
                Tabrik va tilaklaringiz
              </label>
              <textarea
                id="wish-message"
                className="wishes__textarea"
                placeholder="Kelin va kuyovga samimiy tilaklaringizni yozing..."
                rows={4}
                maxLength={600}
                value={form.message}
                onChange={(e) => {
                  setForm({ ...form, message: e.target.value });
                  if (status === 'error') setStatus('idle');
                }}
                required
              />
            </div>

            {status === 'error' && errorMsg && (
              <p className="wishes__error" role="alert">
                {errorMsg}
              </p>
            )}

            {status === 'success' && (
              <motion.p
                className="wishes__sent"
                role="status"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Samimiy tilagingiz uchun tashakkur! Tabrikingiz muvaffaqiyatli qabul qilindi.
              </motion.p>
            )}

            <button
              type="submit"
              className="wishes__submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <span>Yuborilmoqda...</span>
              ) : (
                <span>Tilakni yuborish</span>
              )}
            </button>
          </form>
        </motion.div>

        {/* Wishes Feed */}
        <div className="wishes__list">
          <h3 className="wishes__list-title">Yuborilgan tilaklar</h3>

          {isLoadingList ? (
            <p className="wishes__empty">Tilaklar yuklanmoqda...</p>
          ) : wishes.length === 0 ? (
            <p className="wishes__empty">
              Hozircha tilaklar yo&apos;q. Birinchi bo&apos;lib ezgu tilak qoldiring.
            </p>
          ) : (
            <div className="wishes__cards">
              {wishes.map((wish, index) => (
                <article className="wishes__card" key={wish.id || index}>
                  <header className="wishes__card-header">
                    <span className="wishes__card-initial" aria-hidden="true">
                      {wish.name.charAt(0).toUpperCase()}
                    </span>
                    <div className="wishes__card-meta">
                      <h4 className="wishes__card-name">{wish.name}</h4>
                      {wish.created_at && (
                        <time className="wishes__card-date">
                          {formatDate(wish.created_at)}
                        </time>
                      )}
                    </div>
                  </header>
                  <p className="wishes__card-message">{wish.message}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default WishesSection;
