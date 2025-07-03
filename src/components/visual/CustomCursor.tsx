'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  if (typeof window === 'undefined') return null;

  const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isDesktop) return null;

  const [isActive, setIsActive] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const width = useMotionValue(32);
  const height = useMotionValue(32);

  const smoothW = useSpring(width, { stiffness: 1000, damping: 60 });
  const smoothH = useSpring(height, { stiffness: 1000, damping: 60 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;

      // const isInputElement =
      //   target?.tagName === 'TEXTAREA' ||
      //   target?.tagName === 'INPUT' ||
      //   target?.tagName === 'SELECT' ||
      //   target?.getAttribute('contenteditable') === 'true';
      const isTextInput = target?.matches(
        'textarea, select, [contenteditable="true"], input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input[type="search"], input[type="password"]',
      );

      if (isTextInput) {
        setIsTextInput(true);
        width.set(2);
        height.set(28);
        x.set(e.clientX - 1);
        y.set(e.clientY - 14);
        return;
      } else {
        setIsTextInput(false);
      }

      const interactive = target?.closest(
        'a:not([data-no-cursor-hover]),button:not([data-no-cursor-hover]),[role="button"]:not([data-no-cursor-hover]),input[type="checkbox"]:not([data-no-cursor-hover]),input[type="radio"]:not([data-no-cursor-hover]),[data-hover-box]:not([data-no-cursor-hover])',
      ) as HTMLElement | null;

      const padding = 8;

      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const relX = e.clientX - centerX;
        const relY = e.clientY - centerY;

        interactive.style.transform = `translate(${relX * 0.2}px, ${relY * 0.2}px)`;

        width.set(rect.width + padding * 2);
        height.set(rect.height + padding * 2);
        x.set(rect.left - padding);
        y.set(rect.top - padding);
        setIsActive(true);
      } else {
        width.set(20);
        height.set(20);
        x.set(e.clientX - 10);
        y.set(e.clientY - 10);
        setIsActive(false);

        document.querySelectorAll('a, button, [role="button"], [data-hover-box]').forEach((el) => {
          if (!el.matches('[data-no-cursor-hover]')) {
            (el as HTMLElement).style.transform = 'translate(0px, 0px)';
          }
        });
      }
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, [x, y, width, height]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-multiply"
      style={{
        x: x,
        y: y,
        width: smoothW,
        height: smoothH,
        borderRadius: isTextInput ? 0 : isActive ? 6 : '50%',
        backgroundColor: isTextInput
          ? 'rgba(44,111,160,0.5)'
          : isActive
            ? '#d9e5f1'
            : 'rgba(44,111,160,0.5)',
      }}
    />
  );
}
