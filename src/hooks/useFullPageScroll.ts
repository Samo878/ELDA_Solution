import { useCallback, useEffect, useRef, useState } from 'react';

const COOLDOWN_MS = 800; // prevents multi-jump from aggressive scrolling
const SWIPE_THRESHOLD = 50; // minimum px for a touch swipe to register

export function useFullPageScroll(totalSections: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);

  const scrollTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, totalSections - 1));
      if (clamped === activeIndex && isAnimating.current) return;

      isAnimating.current = true;
      lastScrollTime.current = Date.now();
      setActiveIndex(clamped);

      setTimeout(() => {
        isAnimating.current = false;
      }, COOLDOWN_MS);
    },
    [activeIndex, totalSections],
  );

  const goNext = useCallback(() => scrollTo(activeIndex + 1), [activeIndex, scrollTo]);
  const goPrev = useCallback(() => scrollTo(activeIndex - 1), [activeIndex, scrollTo]);

  // Wheel handler — one section per gesture
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const now = Date.now();
      if (now - lastScrollTime.current < COOLDOWN_MS) return;

      if (e.deltaY > 0) goNext();
      else if (e.deltaY < 0) goPrev();
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [goNext, goPrev]);

  // Touch handlers
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      const now = Date.now();
      if (now - lastScrollTime.current < COOLDOWN_MS) return;

      if (Math.abs(deltaY) > SWIPE_THRESHOLD) {
        if (deltaY > 0) goNext();
        else goPrev();
      }
    };

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goNext, goPrev]);

  // Keyboard support (arrow keys)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  return { activeIndex, scrollTo, containerRef };
}
