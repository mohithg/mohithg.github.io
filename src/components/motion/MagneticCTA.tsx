import { motion, useMotionValue, useSpring, useReducedMotion, type HTMLMotionProps } from 'motion/react';
import { useRef, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  strength?: number;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  ariaLabel?: string;
};

// Magnetic CTA with spring physics: the button drifts toward the cursor
// when nearby and snaps back on leave. Heavier feel than CSS lerp.
export default function MagneticCTA({
  children,
  strength = 0.28,
  className = '',
  href,
  onClick,
  type = 'button',
  ariaLabel,
}: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const common: HTMLMotionProps<'a'> & HTMLMotionProps<'button'> = {
    style: { x: sx, y: sy } as any,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    whileTap: reduce ? undefined : { scale: 0.97 },
    className,
    'aria-label': ariaLabel,
  } as any;

  if (href) {
    return (
      <motion.a ref={ref as any} href={href} {...(common as HTMLMotionProps<'a'>)}>
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button ref={ref as any} type={type} onClick={onClick} {...(common as HTMLMotionProps<'button'>)}>
      {children}
    </motion.button>
  );
}
