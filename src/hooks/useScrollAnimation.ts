import { useEffect } from 'react';

export function useScrollAnimation(rootMargin = '0px 0px -60px 0px') {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin }
    );

    const selector = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
    document.querySelectorAll(selector).forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [rootMargin]);
}
