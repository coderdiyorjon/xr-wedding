import { useState, useRef } from 'react';
import EnvelopeOpening from './components/EnvelopeOpening';
import LoveHeroSection from './components/LoveHeroSection';
import GreetingSection from './components/GreetingSection';
import CountdownSection from './components/CountdownSection';
import EventDetails from './components/EventDetails';
import LocationSection from './components/LocationSection';
import GallerySection from './components/GallerySection';
import WishesSection from './components/WishesSection';
import Footer from './components/Footer';
import MusicToggle from './components/MusicToggle';
import FloatingParticles from './components/FloatingParticles';
import './App.css';

function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);
  const contentRef = useRef(null);

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);

    // Try to play music automatically on user interaction
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsMusicPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked by browser policy - user can toggle manually
          setIsMusicPlaying(false);
        });
    }

    // Smooth scroll to top of content
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsMusicPlaying(true);
        })
        .catch(() => {
          setIsMusicPlaying(false);
        });
    }
  };

  return (
    <div className="app">
      {/* Background Music */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/audio/wedding-music.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Particles */}
      {isInvitationOpen && <FloatingParticles />}

      {/* Persistent Music Toggle */}
      {isInvitationOpen && (
        <MusicToggle isPlaying={isMusicPlaying} onToggle={toggleMusic} />
      )}

      {/* Realistic 3D Envelope Opening Screen */}
      <EnvelopeOpening onOpen={handleOpenInvitation} isOpen={isInvitationOpen} />

      {/* Main Website Content */}
      <main
        ref={contentRef}
        className={`main-content ${isInvitationOpen ? 'visible' : 'hidden'}`}
      >
        {/* Scroll-Driven LOVE Typography Hero Section */}
        <LoveHeroSection />

        {/* Existing Sections Preserved (RSVP Section Removed as Requested) */}
        <GreetingSection />
        <CountdownSection />
        <EventDetails />
        <LocationSection />
        <GallerySection />
        <WishesSection />
        <Footer />
      </main>
    </div>
  );
}

export default App;
