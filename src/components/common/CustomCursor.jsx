import React, { useEffect, useRef } from 'react';
import './CustomCursor.css';

/**
 * CustomCursor
 * A small custom cursor dot + trailing ring (terminal/dev aesthetic).
 * Hides automatically on touch devices.
 * Mount once in App.jsx: <CustomCursor />
 */
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    let ringX = 0, ringY = 0;

    const moveCursor = (e) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      ringX = e.clientX;
      ringY = e.clientY;
    };

    const animateRing = () => {
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animateRing);
    };

    const handleHoverStart = () => ring.classList.add('cursor-ring--active');
    const handleHoverEnd = () => ring.classList.remove('cursor-ring--active');

    window.addEventListener('mousemove', moveCursor);
    requestAnimationFrame(animateRing);

    const interactiveEls = document.querySelectorAll('a, button, [role="button"]');
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

export default CustomCursor;
