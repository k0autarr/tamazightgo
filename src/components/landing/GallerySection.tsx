import React from 'react';
import './GallerySection.css';

const images = [
  {
    src: '/assets/atlas-mountains.png',
    alt: 'Atlas Mountains landscape',
    label: 'Atlas Mountains',
    sub: 'Idurar n Draren',
    gradient: 'gallery__grad--atlas',
    tifinagh: 'ⵉⴷⵓⵔⴰⵔ',
    size: 'tall',
  },
  {
    src: '/assets/moroccan-village.png',
    alt: 'Traditional Amazigh village',
    label: 'Amazigh Village',
    sub: 'Taddart',
    gradient: 'gallery__grad--village',
    tifinagh: 'ⵜⴰⴷⴷⴰⵔⵜ',
    size: 'wide',
  },
  {
    src: '/assets/amazigh-craft.png',
    alt: 'Traditional Amazigh geometric pattern',
    label: 'Traditional Craft',
    sub: 'Tissnt',
    gradient: 'gallery__grad--craft',
    tifinagh: 'ⵜⵉⵙⵙⵏⵜ',
    size: 'normal',
  },
  {
    src: '/assets/moroccan-desert.png',
    alt: 'Moroccan Sahara desert',
    label: 'Sahara Desert',
    sub: 'Ighedlan',
    gradient: 'gallery__grad--desert',
    tifinagh: 'ⵉⵖⴷⵍⴰⵏ',
    size: 'normal',
  },
  {
    src: '/assets/amazigh-market.png',
    alt: 'Traditional Moroccan souk',
    label: 'Weekly Souk',
    sub: 'Assuq',
    gradient: 'gallery__grad--souk',
    tifinagh: 'ⴰⵙⵙⵓⵇ',
    size: 'wide',
  },
  {
    src: '/assets/amazigh-festival.png',
    alt: 'Amazigh cultural celebration',
    label: 'Cultural Festival',
    sub: 'Taɣuri',
    gradient: 'gallery__grad--festival',
    tifinagh: 'ⵜⴰⵖⵓⵔⵉ',
    size: 'tall',
  },
] as const;

const GallerySection: React.FC = () => {
  return (
    <section className="gallery">
      <div className="container">
        <div className="gallery__header reveal">
          <span className="section-label">Morocco Through the Lens</span>
          <h2 className="gallery__title">
            The world you're learning
            <br />
            <em>to speak about.</em>
          </h2>
        </div>

        <div className="gallery__grid">
          {images.map((img, i) => (
            <div
              key={img.label}
              className={`gallery__item gallery__item--${img.size} reveal delay-${(i % 3) + 1}`}
            >
              <div className="gallery__img-wrap">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="gallery__img"
                  loading="lazy"
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
                {/* Gradient fallback */}
                <div className={`gallery__gradient ${img.gradient}`} aria-hidden="true">
                  <span className="gallery__grad-char">{img.tifinagh}</span>
                </div>
                {/* Hover overlay */}
                <div className="gallery__overlay" aria-hidden="true">
                  <div className="gallery__overlay-content">
                    <span className="gallery__overlay-tifinagh">{img.tifinagh}</span>
                    <span className="gallery__overlay-label">{img.label}</span>
                    <span className="gallery__overlay-sub">{img.sub}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Cultural quote card — fills the empty grid cell (cols 1-2, row 4) */}
          <div className="gallery__item gallery__item--wide gallery__quote reveal delay-2">
            <div className="gallery__quote-inner">
              {/* Amazigh pattern texture overlay */}
              <div
                className="gallery__quote-pattern"
                style={{ backgroundImage: "url('/assets/amazigh-pattern.png')" }}
                aria-hidden="true"
              />
              {/* Corner ornaments */}
              <span className="gallery__quote-ornament gallery__quote-ornament--tl" aria-hidden="true">✦</span>
              <span className="gallery__quote-ornament gallery__quote-ornament--br" aria-hidden="true">✦</span>
              {/* Content */}
              <span className="gallery__quote-symbol" aria-hidden="true">ⵣ</span>
              <blockquote className="gallery__quote-text">
                Language is memory,<br />culture, and belonging.
              </blockquote>
              <div className="gallery__quote-footer">
                <div className="gallery__quote-divider" aria-hidden="true" />
                <span className="gallery__quote-tifinagh">ⵜⴰⵎⴰⵣⵉⵖⵜ</span>
                <span className="gallery__quote-source">Amazigh Heritage</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
