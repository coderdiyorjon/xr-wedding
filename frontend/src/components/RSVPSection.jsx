import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { submitRSVP } from '../utils/api';
import './RSVPSection.css';

function RSVPSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [form, setForm] = useState({ name: '', attending: 'yes', guestCount: 1 });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      await submitRSVP({
        name: form.name.trim(),
        attending: form.attending === 'yes',
        guestCount: form.attending === 'yes' ? Number(form.guestCount) : 0,
      });
      setStatus('success');
      setForm({ name: '', attending: 'yes', guestCount: 1 });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Xatolik yuz berdi');
    }
  };

  return (
    <section className="rsvp" ref={ref}>
      <div className="rsvp__container">
        <motion.div
          className="rsvp__ornament"
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
          Ishtirok etasizmi?
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Iltimos, ishtirok eta olishingizni bizga bildiring
        </motion.p>

        <motion.div
          className="rsvp__form-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {status === 'success' ? (
            <motion.div
              className="rsvp__success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="rsvp__success-icon">✅</span>
              <h3 className="rsvp__success-title">Rahmat!</h3>
              <p className="rsvp__success-text">Javobingiz qabul qilindi. Sizni kutib qolamiz!</p>
              <button
                className="rsvp__again-btn"
                onClick={() => setStatus('idle')}
              >
                Qayta yuborish
              </button>
            </motion.div>
          ) : (
            <form className="rsvp__form" onSubmit={handleSubmit}>
              <div className="rsvp__field">
                <label className="rsvp__label" htmlFor="rsvp-name">
                  Ismingiz
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  className="rsvp__input"
                  placeholder="To'liq ismingizni kiriting"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className="rsvp__field">
                <label className="rsvp__label">Ishtirok etasizmi?</label>
                <div className="rsvp__radio-group">
                  <label className={`rsvp__radio ${form.attending === 'yes' ? 'rsvp__radio--active' : ''}`}>
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={form.attending === 'yes'}
                      onChange={(e) => setForm({ ...form, attending: e.target.value })}
                    />
                    <span className="rsvp__radio-icon">🎉</span>
                    Ha, albatta!
                  </label>
                  <label className={`rsvp__radio ${form.attending === 'no' ? 'rsvp__radio--active' : ''}`}>
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={form.attending === 'no'}
                      onChange={(e) => setForm({ ...form, attending: e.target.value })}
                    />
                    <span className="rsvp__radio-icon">😔</span>
                    Afsuski, yo'q
                  </label>
                </div>
              </div>

              {form.attending === 'yes' && (
                <motion.div
                  className="rsvp__field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="rsvp__label" htmlFor="rsvp-guests">
                    Mehmonlar soni
                  </label>
                  <input
                    id="rsvp-guests"
                    type="number"
                    className="rsvp__input rsvp__input--number"
                    min="1"
                    max="20"
                    value={form.guestCount}
                    onChange={(e) => setForm({ ...form, guestCount: e.target.value })}
                  />
                </motion.div>
              )}

              {status === 'error' && (
                <p className="rsvp__error">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="rsvp__submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <span className="rsvp__spinner" />
                ) : (
                  <>
                    <span>💌</span> Yuborish
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default RSVPSection;
