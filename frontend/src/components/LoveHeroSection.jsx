import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './LoveHeroSection.css';

gsap.registerPlugin(ScrollTrigger);

function LoveHeroSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const letterLRef = useRef(null);
  const letterORef = useRef(null);
  const letterVRef = useRef(null);
  const letterERef = useRef(null);
  const centerRevealRef = useRef(null);
  const floralTopLeftRef = useRef(null);
  const floralBottomRightRef = useRef(null);
  const namesRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Accessibility fallback: keep elements in place with subtle fade
        return;
      }

      // Main scroll-pinned timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=160%', // controlled scroll track for the animation sequence
          pin: true,
          pinSpacing: true,
          scrub: 1.2, // buttery smooth scrub connected to scroll
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Phase 2: Simultaneous outward separation of letters
      // L and V move leftwards; O and E move rightwards
      tl.to(
        [letterLRef.current, letterVRef.current],
        {
          x: () => -Math.min(window.innerWidth * 0.45, 520),
          opacity: 0.25,
          ease: 'power2.out',
        },
        0
      )
        .to(
          [letterORef.current, letterERef.current],
          {
            x: () => Math.min(window.innerWidth * 0.45, 520),
            opacity: 0.25,
            ease: 'power2.out',
          },
          0
        )
        // Reveal central romantic emblem as letters separate
        .to(
          centerRevealRef.current,
          {
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
          },
          0.1
        )
        // Subtle floral parallax
        .to(
          floralTopLeftRef.current,
          {
            y: -30,
            x: -20,
            rotation: -8,
            ease: 'none',
          },
          0
        )
        .to(
          floralBottomRightRef.current,
          {
            y: 30,
            x: 20,
            rotation: 8,
            ease: 'none',
          },
          0
        )
        // Refined names and subtitle subtle drift
        .to(
          namesRef.current,
          {
            y: -15,
            opacity: 0.9,
            ease: 'power1.out',
          },
          0
        )
        .to(
          subtitleRef.current,
          {
            y: 15,
            opacity: 0.9,
            ease: 'power1.out',
          },
          0
        );
    }, sectionRef);

    // Refresh ScrollTrigger once fonts and images load
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section className="love-hero" ref={sectionRef}>
      <div className="love-hero__stage" ref={containerRef}>
        {/* Soft background ambiance */}
        <div className="love-hero__bg-glow" />
        <div className="love-hero__bg-grid" />

        {/* Decorative Top-Left Floral Arrangement */}
        <div className="love-hero__floral love-hero__floral--tl" ref={floralTopLeftRef}>
          <svg
            viewBox="0 0 280 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="love-hero__floral-svg"
            aria-hidden="true"
          >
            {/* Elegant botanical branches & blooming leaves */}
            <path
              d="M10 10C50 60 80 120 70 200C110 170 140 100 130 30"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeOpacity="0.45"
            />
            <path
              d="M30 15C90 70 160 90 240 70C190 120 120 150 50 120"
              stroke="#D4AF37"
              strokeWidth="1.2"
              strokeOpacity="0.35"
            />
            {/* Soft rose petal buds */}
            <ellipse cx="65" cy="85" rx="22" ry="16" transform="rotate(-30 65 85)" fill="#F5E6E0" fillOpacity="0.65" stroke="#8B2252" strokeWidth="0.8" strokeOpacity="0.35" />
            <ellipse cx="78" cy="80" rx="18" ry="14" transform="rotate(-15 78 80)" fill="#FFF8F0" fillOpacity="0.8" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.4" />
            <ellipse cx="150" cy="55" rx="18" ry="12" transform="rotate(25 150 55)" fill="#F5E6E0" fillOpacity="0.6" stroke="#8B2252" strokeWidth="0.8" strokeOpacity="0.3" />
            <circle cx="70" cy="82" r="5" fill="#D4AF37" fillOpacity="0.7" />
            <circle cx="148" cy="54" r="4" fill="#D4AF37" fillOpacity="0.7" />
            {/* Delicate gold leaves */}
            <path d="M40 45 Q 60 25 80 40 Q 60 55 40 45 Z" fill="#D4AF37" fillOpacity="0.25" />
            <path d="M100 100 Q 125 85 140 105 Q 115 120 100 100 Z" fill="#D4AF37" fillOpacity="0.22" />
            <path d="M60 160 Q 80 145 95 165 Q 75 180 60 160 Z" fill="#D4AF37" fillOpacity="0.2" />
          </svg>
        </div>

        {/* Decorative Bottom-Right Floral Arrangement */}
        <div className="love-hero__floral love-hero__floral--br" ref={floralBottomRightRef}>
          <svg
            viewBox="0 0 280 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="love-hero__floral-svg"
            aria-hidden="true"
          >
            <path
              d="M270 270C230 220 200 160 210 80C170 110 140 180 150 250"
              stroke="#D4AF37"
              strokeWidth="1.5"
              strokeOpacity="0.45"
            />
            <path
              d="M250 265C190 210 120 190 40 210C90 160 160 130 230 160"
              stroke="#D4AF37"
              strokeWidth="1.2"
              strokeOpacity="0.35"
            />
            <ellipse cx="215" cy="195" rx="22" ry="16" transform="rotate(150 215 195)" fill="#F5E6E0" fillOpacity="0.65" stroke="#8B2252" strokeWidth="0.8" strokeOpacity="0.35" />
            <ellipse cx="202" cy="200" rx="18" ry="14" transform="rotate(165 202 200)" fill="#FFF8F0" fillOpacity="0.8" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.4" />
            <ellipse cx="130" cy="225" rx="18" ry="12" transform="rotate(-155 130 225)" fill="#F5E6E0" fillOpacity="0.6" stroke="#8B2252" strokeWidth="0.8" strokeOpacity="0.3" />
            <circle cx="210" cy="198" r="5" fill="#D4AF37" fillOpacity="0.7" />
            <circle cx="132" cy="226" r="4" fill="#D4AF37" fillOpacity="0.7" />
            <path d="M240 235 Q 220 255 200 240 Q 220 225 240 235 Z" fill="#D4AF37" fillOpacity="0.25" />
            <path d="M180 180 Q 155 195 140 175 Q 165 160 180 180 Z" fill="#D4AF37" fillOpacity="0.22" />
            <path d="M220 120 Q 200 135 185 115 Q 205 100 220 120 Z" fill="#D4AF37" fillOpacity="0.2" />
          </svg>
        </div>

        {/* Top-Right: Groom & Bride Names */}
        <div className="love-hero__names" ref={namesRef}>
          <span className="love-hero__names-text">Xurshidjon & Ruxshonaoy</span>
          <span className="love-hero__names-date">06.12.2026</span>
        </div>

        {/* Bottom-Left: Subtitle */}
        <div className="love-hero__subtitle" ref={subtitleRef}>
          <span className="love-hero__subtitle-line" />
          <p className="love-hero__subtitle-text">Love governs the world</p>
        </div>

        {/* Central Reveal that emerges as L & V and O & E part */}
        <div className="love-hero__center-reveal" ref={centerRevealRef}>
          <div className="center-reveal__ornament">✦ ✦ ✦</div>
          <div className="center-reveal__monogram">X & R</div>
          <h2 className="center-reveal__heading">To'y Taklifnomasi</h2>
          <p className="center-reveal__date">2026-yil, 6-dekabr</p>
          <div className="center-reveal__scroll-indicator">
            <span className="scroll-mouse" />
            <span className="scroll-caption">Pastga suring</span>
          </div>
        </div>

        {/* Center: The word LOVE displayed vertically */}
        <div className="love-hero__love-container" aria-label="LOVE">
          <div className="love-letter love-letter--l" ref={letterLRef}>
            L
          </div>
          <div className="love-letter love-letter--o" ref={letterORef}>
            O
          </div>
          <div className="love-letter love-letter--v" ref={letterVRef}>
            V
          </div>
          <div className="love-letter love-letter--e" ref={letterERef}>
            E
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoveHeroSection;
