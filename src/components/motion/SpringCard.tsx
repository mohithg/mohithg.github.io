import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

type Accent = 'violet' | 'mint' | 'pink';

type Props = {
  children: ReactNode;
  index?: number;
  accent?: Accent;
  className?: string;
  lift?: boolean;
  id?: string;
};

// A reusable Motion-powered card: spring entrance from below, hover lift
// with spring physics. We deliberately do NOT use the CSS cursor-glow
// system here because it sets a data-glow-init attribute on the element
// post-hydration, which would cause a React hydration mismatch and freeze
// the card in its initial (opacity 0) state. The motion hover effect is
// enough on its own.
export default function SpringCard({
  children,
  index = 0,
  accent: _accent = 'violet',
  className = '',
  lift = true,
  id,
}: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      id={id}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
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
