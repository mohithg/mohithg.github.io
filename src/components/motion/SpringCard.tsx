import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

type Accent = 'violet' | 'mint' | 'pink';

type Props = {
  children: ReactNode;
  index?: number;
  accent?: Accent;
  className?: string;
  glow?: boolean;
  lift?: boolean;
  id?: string;
};

const ACCENT_RGB: Record<Accent, string> = {
  violet: 'var(--color-violet)',
  mint: 'var(--color-mint)',
  pink: 'var(--color-pink)',
};

// A reusable Motion-powered card: spring entrance from below, hover lift
// with spring physics, optional cursor-glow.
export default function SpringCard({
  children,
  index = 0,
  accent = 'violet',
  className = '',
  glow = true,
  lift = true,
  id,
}: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      id={id}
      data-glow={glow ? '' : undefined}
      style={glow ? { ['--glow-color' as string]: ACCENT_RGB[accent] } : undefined}
      initial={reduce ? false : { opacity: 0, y: 36, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{
        type: 'spring',
        stiffness: 220,
        damping: 24,
        mass: 0.7,
        delay: Math.min(index, 6) * 0.06,
      }}
      whileHover={
        reduce || !lift
          ? undefined
          : {
              y: -4,
              scale: 1.01,
              transition: { type: 'spring', stiffness: 300, damping: 22 },
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
