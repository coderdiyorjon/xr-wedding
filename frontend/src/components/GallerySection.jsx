import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GallerySection.css';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_PHOTOS = [
  { id: 1, numeral: 'I', src: '/images/photo1.jpg', caption: 'Oydin kechadagi raqs' },
  { id: 2, numeral: 'II', src: '/images/photo2.jpg', caption: 'Oltin shu’ladagi uchrashuv' },
  { id: 3, numeral: 'III', src: '/images/photo3.jpg', caption: 'Yomg‘irli ko‘chadagi baxt' },
  { id: 4, numeral: 'IV', src: '/images/photo4.jpg', caption: 'Yulduzli osmon ostida' },
  { id: 5, numeral: 'V', src: '/images/photo5.jpg', caption: 'Shafaq nurlari bag‘rida' },
  { id: 6, numeral: 'VI', src: '/images/photo6.jpg', caption: 'Sokin muhabbat lahzasida' },
];

function GallerySection({ isActive = true }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!isActive) return undefined;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.gallery__item');
      if (prefersReducedMotion) {
        gsap.set(items, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 });
        return;
      }

      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          { clipPath: 'inset(14% 0% 14% 0%)', opacity: 0.25, y: 28 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            y: 0,
            duration: 1.05,
            delay: (index % 3) * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 86%',
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <section className="gallery" ref={sectionRef} aria-label="Sevgi hikoyasi galereyasi">
      <div className="gallery__container">
        <p className="section-eyebrow">Xotiralar va lahzalar</p>
        <h2 className="section-title section-title--light">
          Bizning sevgi hikoyamiz
        </h2>

        <div className="ornament" aria-hidden="true">
          <span className="ornament-line" />
          <span className="ornament-diamond" />
          <span className="ornament-line" />
        </div>

        <div className="gallery__grid">
          {GALLERY_PHOTOS.map((photo) => (
            <figure className="gallery__item" key={photo.id}>
              <div className="gallery__frame">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  decoding="async"
                  className="gallery__image"
                />
                <div className="gallery__vignette" aria-hidden="true" />
              </div>
              <figcaption className="gallery__caption">
                <span className="gallery__numeral">{photo.numeral}</span>
                <span className="gallery__caption-text">{photo.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GallerySection;
