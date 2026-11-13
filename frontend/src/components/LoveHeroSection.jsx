import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BotanicalOrnament from './BotanicalOrnament';
import './LoveHeroSection.css';

gsap.registerPlugin(ScrollTrigger);

function LoveHeroSection({ isActive = true }) {
  const sectionRef = useRef(null);
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
    if (!isActive) return undefined;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(centerRevealRef.current, { opacity: 1, scale: 1 });
        return;
      }

      const getSplitDistance = () => {
        const vw = window.innerWidth;
        if (vw < 540) return Math.min(vw * 0.3, 130);
        if (vw < 960) return Math.min(vw * 0.34, 290);
        return Math.min(vw * 0.36, 460);
      };

      // Ensure clean starting state
      gsap.set(centerRevealRef.current, { opacity: 0, scale: 0.86 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=155%',
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Phase 2 & 3: L & V move left, O & E move right simultaneously
      tl.to(
        [letterLRef.current, letterVRef.current],
        {
          x: () => -getSplitDistance(),
          opacity: 0.18,
          ease: 'power2.inOut',
          duration: 1,
        },
        0
      )
        .to(
          [letterORef.current, letterERef.current],
          {
            x: () => getSplitDistance(),
            opacity: 0.18,
            ease: 'power2.inOut',
            duration: 1,
          },
          0
        )
        // Central romantic reveal emerges smoothly between the parted letters
        .to(
          centerRevealRef.current,
          {
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            duration: 0.75,
          },
          0.18
        )
        // Subtle floral corner parallax
        .to(
          floralTopLeftRef.current,
          {
            y: -26,
            x: -18,
            rotation: -6,
            ease: 'none',
            duration: 1,
          },
          0
        )
        .to(
          floralBottomRightRef.current,
          {
            y: 26,
            x: 18,
            rotation: 6,
            ease: 'none',
            duration: 1,
          },
          0
        )
        // Delicate drift on top-right names and bottom-left phrase
        .to(
          namesRef.current,
          {
            y: -12,
            opacity: 0.85,
            ease: 'power1.out',
            duration: 1,
          },
          0
        )
        .to(
          subtitleRef.current,
          {
            y: 12,
            opacity: 0.85,
            ease: 'power1.out',
            duration: 1,
          },
          0
        )
        // Brief hold at peak reveal before releasing cleanly
        .to({}, { duration: 0.2 });
    }, sectionRef);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [isActive]);

  return (
    <section
      className="love-hero"
      ref={sectionRef}
      aria-label="Sevgi hikoyasi — LOVE animatsiyasi"
      data-testid="love-hero-section"
    >
      <div className="love-hero__stage">
        <div className="love-hero__bg-glow" aria-hidden="true" />
        <div className="love-hero__frame" aria-hidden="true" />

        {/* Top-Left & Bottom-Right Floral Arrangements */}
        <div
          className="love-hero__floral love-hero__floral--tl"
          ref={floralTopLeftRef}
          aria-hidden="true"
        >
          <BotanicalOrnament variant="corner" tone="dark" />
        </div>

        <div
          className="love-hero__floral love-hero__floral--br"
          ref={floralBottomRightRef}
          aria-hidden="true"
        >
          <BotanicalOrnament variant="corner" tone="dark" />
        </div>

        {/* Top-Right: Couple Names */}
        <div className="love-hero__names" ref={namesRef}>
          <span className="love-hero__names-text">Xurshidjon &amp; Ruxshonaoy</span>
          <span className="love-hero__names-date">06.12.2026</span>
        </div>

        {/* Bottom-Left: Romantic Uzbek Phrase */}
        <div className="love-hero__subtitle" ref={subtitleRef}>
          <span className="love-hero__subtitle-line" aria-hidden="true" />
          <p className="love-hero__subtitle-text">
            Sevgi — ikki qalbni birlashtiruvchi abadiy nur
          </p>
        </div>

        {/* Central Reveal Emerging Between Split Letters */}
        <div className="love-hero__center-reveal" ref={centerRevealRef}>
          <BotanicalOrnament variant="rose-crest" tone="dark" />
          <div className="center-reveal__monogram">X &amp; R</div>
          <h2 className="center-reveal__heading">Abadiy muhabbat</h2>
          <p className="center-reveal__date">2026-yil, 6-dekabr</p>
        </div>

        {/* Vertical LOVE Stack */}
        <div className="love-hero__love-container" aria-hidden="true">
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
