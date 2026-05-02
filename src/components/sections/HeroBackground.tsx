import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';

// Parallax mesh + grid + drifting nodes that respond to scroll AND cursor.
// Also drives the scroll-linked headline scale/fade behavior on the hero.
// Mounts as a React island behind the Hero copy.
export default function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const meshY = useTransform(scrollY, [0, 800], [0, -120]);
  const gridY = useTransform(scrollY, [0, 800], [0, 200]);
  const gridScale = useTransform(scrollY, [0, 800], [1, 1.1]);
  const nodesY = useTransform(scrollY, [0, 800], [0, -260]);
  const haloOpacity = useTransform(scrollY, [0, 600], [0.7, 0.2]);

  // Drive a CSS variable on document.documentElement so non-React Astro
  // components can read it (used by the hero headline for scroll-linked
  // scale + fade as the visitor scrolls past).
  useEffect(() => {
    const unsub = scrollY.on('change', (v) => {
      const t = Math.min(1, Math.max(0, v / 600));
      const scale = 1 - t * 0.06;
      const opacity = 1 - t * 0.5;
      document.documentElement.style.setProperty('--hero-scroll-scale', String(scale));
      document.documentElement.style.setProperty('--hero-scroll-opacity', String(opacity));
    });
    return () => unsub();
  }, [scrollY]);

  // Cursor parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set((e.clientX - w / 2) / w);
      my.set((e.clientY - h / 2) / h);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  const cursorMeshX = useTransform(sx, (v) => v * 60);
  const cursorMeshY = useTransform(sy, (v) => v * 60);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Mesh gradient: moves with both scroll and cursor */}
      <motion.div
        style={{ y: meshY, x: cursorMeshX, opacity: haloOpacity }}
        className="absolute -inset-40 [animation:var(--animate-mesh)]"
      >
        <div className="mesh-bg absolute inset-0" />
      </motion.div>

      {/* Grid layer with parallax */}
      <motion.div
        style={{ y: gridY, scale: gridScale, x: cursorMeshY }}
        className="grid-bg absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
      />

      {/* Floating particles, parallaxed */}
      <motion.div style={{ y: nodesY }} className="absolute inset-0">
        <span className="absolute left-[12%] top-[28%] h-1 w-1 rounded-full bg-violet" style={{ animation: 'float 6s ease-in-out infinite' }} />
        <span className="absolute right-[18%] top-[20%] h-1.5 w-1.5 rounded-full bg-mint" style={{ animation: 'float 8s ease-in-out infinite 1s' }} />
        <span className="absolute left-[22%] bottom-[18%] h-1 w-1 rounded-full bg-pink" style={{ animation: 'float 7s ease-in-out infinite 0.5s' }} />
        <span className="absolute right-[12%] bottom-[28%] h-1.5 w-1.5 rounded-full bg-violet-soft" style={{ animation: 'float 9s ease-in-out infinite 2s' }} />
        <span className="absolute left-[42%] top-[12%] h-1 w-1 rounded-full bg-mint" style={{ animation: 'float 10s ease-in-out infinite 0.8s' }} />
        <span className="absolute right-[35%] top-[55%] h-1 w-1 rounded-full bg-violet/70" style={{ animation: 'float 12s ease-in-out infinite 1.2s' }} />
        <span className="absolute left-[60%] bottom-[10%] h-0.5 w-0.5 rounded-full bg-mint/80" style={{ animation: 'float 11s ease-in-out infinite 0.3s' }} />
        <span className="absolute left-[80%] top-[70%] h-1 w-1 rounded-full bg-violet-soft/60" style={{ animation: 'float 13s ease-in-out infinite 0.6s' }} />
      </motion.div>
    </div>
  );
}
