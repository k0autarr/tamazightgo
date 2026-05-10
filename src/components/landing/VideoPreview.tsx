import React, { useState, useRef, useEffect } from 'react';
import './VideoPreview.css';

const VideoPreview: React.FC = () => {
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.play().catch(() => {}); }
    else { v.pause(); }
  }, [playing]);

  const handleToggle = () => setPlaying(p => !p);

  return (
    <section className="video" id="video">
      <div className="video__inner">
        {/* Background gradient — Moroccan landscape palette */}
        <div className="video__bg" aria-hidden="true">
          <video
            ref={videoRef}
            src="/assets/culture-video.mp4"
            className="video__actual"
            loop
            muted
            playsInline
            autoPlay
          />
          {/* CSS fallback landscape */}
          <div className="video__gradient-fallback" aria-hidden="true" />
        </div>

        {/* Overlay */}
        <div className="video__overlay" aria-hidden="true" />

        {/* Tifinagh watermark */}
        <div className="video__watermark" aria-hidden="true">ⴰⵎⴰⵣⵉⵖ</div>

        <div className="container">
          <div className="video__content">
            <span className="section-label section-label--light">Cultural Preview</span>

            <h2 className="video__title">
              Feel the heartbeat
              <br />
              <em>of Amazigh Morocco.</em>
            </h2>

            <p className="video__desc">
              Watch stories of language, landscape, and life from Morocco's Amazigh communities.
            </p>

            <button
              className={`video__play${playing ? ' video__play--active' : ''}`}
              onClick={handleToggle}
              aria-label={playing ? 'Pause cultural preview video' : 'Play cultural preview video'}
            >
              <div className="video__play-ring" aria-hidden="true" />
              <div className="video__play-inner">
                {playing ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <rect x="5" y="4" width="3.5" height="12" rx="1.5" fill="currentColor"/>
                    <rect x="11.5" y="4" width="3.5" height="12" rx="1.5" fill="currentColor"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M7 4.5L16 10L7 15.5V4.5Z" fill="currentColor"/>
                  </svg>
                )}
              </div>
            </button>

            <p className="video__hint">
              {playing ? 'Click to pause' : 'Click to play preview'}
            </p>
          </div>
        </div>

        {/* Bottom wave divider */}
        <div className="video__wave" aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--cream)"/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default VideoPreview;
