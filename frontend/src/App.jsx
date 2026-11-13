import { useState, useRef, useEffect, useCallback } from 'react';
import EnvelopeOpening from './components/EnvelopeOpening';
import HeroSection from './components/HeroSection';
import LoveHeroSection from './components/LoveHeroSection';
import GreetingSection from './components/GreetingSection';
import CountdownSection from './components/CountdownSection';
import EventDetails from './components/EventDetails';
import LocationSection from './components/LocationSection';
import WishesSection from './components/WishesSection';
import Footer from './components/Footer';
import MusicToggle from './components/MusicToggle';
import FloatingParticles from './components/FloatingParticles';
import './App.css';

const TARGET_VOLUME = 0.5;

function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('autostart') === '1';
  });
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [hasAudioError, setHasAudioError] = useState(false);
  const audioRef = useRef(null);
  const fadeTimerRef = useRef(null);

  const rampVolume = useCallback((toVolume, onComplete) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeTimerRef.current) {
      clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }

    const startVolume = audio.volume;
    const steps = 16;
    let step = 0;

    fadeTimerRef.current = setInterval(() => {
      step += 1;
      const progress = step / steps;
      audio.volume = Math.max(
        0,
        Math.min(1, startVolume + (toVolume - startVolume) * progress)
      );

      if (step >= steps) {
        clearInterval(fadeTimerRef.current);
        fadeTimerRef.current = null;
        if (onComplete) onComplete();
      }
    }, 50);
  }, []);

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) {
        clearInterval(fadeTimerRef.current);
      }
    };
  }, []);

  const startAudioSmoothly = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || hasAudioError) return;

    audio.volume = 0;
    audio
      .play()
      .then(() => {
        setIsMusicPlaying(true);
        rampVolume(TARGET_VOLUME);
      })
      .catch(() => {
        setIsMusicPlaying(false);
      });
  }, [hasAudioError, rampVolume]);

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
    startAudioSmoothly();

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 60);
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio || hasAudioError) return;

    if (isMusicPlaying) {
      setIsMusicPlaying(false);
      rampVolume(0, () => {
        audio.pause();
      });
    } else {
      startAudioSmoothly();
    }
  };

  return (
    <div className="app">
      {/* Background Soundtrack (never autoplays before explicit interaction) */}
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        onError={() => setHasAudioError(true)}
      >
        <source src="/audio/wedding-music.mp3" type="audio/mpeg" />
      </audio>

      {/* Subtle Ambient Light Motes */}
      {isInvitationOpen && <FloatingParticles />}

      {/* Persistent Music Toggle */}
      {isInvitationOpen && (
        <MusicToggle
          isPlaying={isMusicPlaying}
          hasError={hasAudioError}
          onToggle={toggleMusic}
        />
      )}

      {/* Opening Envelope Experience */}
      <EnvelopeOpening onOpen={handleOpenInvitation} isOpen={isInvitationOpen} />

      {/* Main Editorial Story */}
      <main
        className={`main-content ${isInvitationOpen ? 'visible' : 'hidden'}`}
        aria-hidden={!isInvitationOpen}
      >
        <HeroSection />
        <LoveHeroSection isActive={isInvitationOpen} />
        <GreetingSection />
        <CountdownSection />
        <EventDetails />
        <LocationSection />
        <WishesSection />
        <Footer />
      </main>
    </div>
  );
}

export default App;
