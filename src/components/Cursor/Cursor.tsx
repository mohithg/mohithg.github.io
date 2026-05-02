import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

// A soft gradient blob that follows the cursor with spring physics.
// Hides on touch devices and when the user prefers reduced motion.
// Scales up on interactive elements.
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.6 });
  const dotX = useSpring(x, { stiffness: 600, damping: 30, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 600, damping: 30, mass: 0.3 });
  const [variant, setVariant] = useState<'default' | 'hover' | 'text'>('default');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = matchMedia('(pointer: fine)').matches;
    if (reduce || !fine) return;
    setEnabled(true);
    document.documentElement.style.cursor = 'none';

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const enter = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest('a, button, [role="button"], [data-cursor-hover]')) {
        setVariant('hover');
      } else if (t.closest('input, textarea, [contenteditable="true"]')) {
        setVariant('text');
      } else {
        setVariant('default');
      }
    };
    const leave = () => setVariant('default');

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', enter, { passive: true });
    document.addEventListener('mouseout', leave, { passive: true });
    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', enter);
      document.removeEventListener('mouseout', leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        aria-hidden
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: variant === 'hover' ? 70 : variant === 'text' ? 4 : 38,
          height: variant === 'hover' ? 70 : variant === 'text' ? 22 : 38,
          borderRadius: variant === 'text' ? 2 : 999,
          opacity: variant === 'text' ? 0.9 : 1,
          backgroundColor:
            variant === 'hover'
              ? 'rgba(124, 92, 255, 0.18)'
              : variant === 'text'
              ? '#7C5CFF'
              : 'rgba(160, 136, 255, 0.10)',
          borderColor:
            variant === 'hover' ? 'rgba(160, 136, 255, 0.6)' : 'rgba(160, 136, 255, 0.3)',
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] border backdrop-blur-[2px] mix-blend-screen"
      />
      {/* Inner dot */}
      <motion.div
        aria-hidden
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: variant === 'text' ? 0 : 1,
          scale: variant === 'hover' ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-paper"
      />
    </>
  );
}
