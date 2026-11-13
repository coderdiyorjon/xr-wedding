import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { submitWish, fetchWishes } from '../utils/api';
import './WishesSection.css';

function WishesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [wishes, setWishes] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    loadWishes();
  }, []);

  const loadWishes = async () => {
    try {
      const data = await fetchWishes();
      setWishes(data);
    } catch (err) {
      // Silently fail - wishes will show empty
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      await submitWish({
        name: form.name.trim(),
        message: form.message.trim(),
      });
      setStatus('success');
      setForm({ name: '', message: '' });
      // Reload wishes to show the new one
      await loadWishes();
      // Reset form after a delay
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Xatolik yuz berdi');
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="wishes" ref={ref}>
      <div className="wishes__container">
        <motion.div
          className="wishes__ornament"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          ✦ ✦ ✦
        </motion.div>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Tabriklar va tilaklar
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Kelin va kuyovga tabrik va tilak yozing
        </motion.p>

        {/* Wish Form */}
        <motion.div
          className="wishes__form-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <form className="wishes__form" onSubmit={handleSubmit}>
            <div className="wishes__field">
              <label className="wishes__label" htmlFor="wish-name">
                Ismingiz
              </label>
              <input
                id="wish-name"
                type="text"
                className="wishes__input"
                placeholder="Ismingizni kiriting"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className="wishes__field">
              <label className="wishes__label" htmlFor="wish-message">
                Tabrik xabaringiz
              </label>
              <textarea
                id="wish-message"
                className="wishes__textarea"
                placeholder="Kelin va kuyovga tabrik va tilak yozing..."
                rows="4"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>

            {status === 'error' && (
              <p className="wishes__error">{errorMsg}</p>
            )}

            {status === 'success' && (
              <motion.p
                className="wishes__sent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ✅ Tabrikingiz yuborildi! Rahmat!
              </motion.p>
            )}

            <button
              type="submit"
              className="wishes__submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <span className="wishes__spinner" />
              ) : (
                <>
                  <span>✍️</span> Yuborish
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Wishes List */}
        {wishes.length > 0 && (
          <motion.div
            className="wishes__list"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="wishes__list-title">
              <span>💝</span> Yuborilgan tabriklar
            </h3>
            <div className="wishes__cards">
              {wishes.map((wish, index) => (
                <motion.div
                  className="wishes__card"
                  key={wish.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="wishes__card-header">
                    <span className="wishes__card-avatar">
                      {wish.name.charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <h4 className="wishes__card-name">{wish.name}</h4>
                      {wish.created_at && (
                        <span className="wishes__card-date">
                          {formatDate(wish.created_at)}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="wishes__card-message">{wish.message}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default WishesSection;
