import { useCallback, useEffect, useRef, useState } from 'react';

const COOLDOWN_MS = 1200; // lock-out after a section jump
const SWIPE_THRESHOLD = 50; // minimum px for a touch swipe to register
const WHEEL_DELTA_THRESHOLD = 120; // accumulated delta needed to trigger a jump
const GESTURE_TIMEOUT_MS = 300; // silence window to consider a gesture ended

export function useFullPageScroll(totalSections: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);

  // Trackpad-aware wheel state
  const accumulatedDelta = useRef(0);
  const lastAbsDelta = useRef(0);
  const gestureTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollFiredInGesture = useRef(false);

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

  // ── Wheel handler — trackpad-aware, one section per gesture ──
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const resetGesture = () => {
      accumulatedDelta.current = 0;
      lastAbsDelta.current = 0;
      scrollFiredInGesture.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Still in post-jump cooldown — eat the event
      const now = Date.now();
      if (now - lastScrollTime.current < COOLDOWN_MS) {
        // Keep resetting gesture state while in cooldown so inertia tail
        // doesn't carry over into the next gesture window
        resetGesture();
        return;
      }

      const absDelta = Math.abs(e.deltaY);

      // ── Inertia detection ──
      // After we already jumped once in this gesture, any event with
      // decreasing |deltaY| is inertia — ignore it.
      if (scrollFiredInGesture.current && absDelta <= lastAbsDelta.current) {
        lastAbsDelta.current = absDelta;
        // Reset the gesture-end timer so we keep waiting for inertia to stop
        if (gestureTimer.current) clearTimeout(gestureTimer.current);
        gestureTimer.current = setTimeout(resetGesture, GESTURE_TIMEOUT_MS);
        return;
      }

      lastAbsDelta.current = absDelta;

      // ── Delta accumulation ──
      accumulatedDelta.current += e.deltaY;

      // Reset the gesture-end timer on every event
      if (gestureTimer.current) clearTimeout(gestureTimer.current);
      gestureTimer.current = setTimeout(resetGesture, GESTURE_TIMEOUT_MS);

      // Only trigger when accumulated delta exceeds threshold
      if (Math.abs(accumulatedDelta.current) >= WHEEL_DELTA_THRESHOLD) {
        if (accumulatedDelta.current > 0) goNext();
        else goPrev();

        scrollFiredInGesture.current = true;
        accumulatedDelta.current = 0;
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
      if (gestureTimer.current) clearTimeout(gestureTimer.current);
    };
  }, [goNext, goPrev]);

  // ── Touch handlers ──
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

  // ── Keyboard support (arrow keys) ──
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
