import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

type Accent = 'violet' | 'mint' | 'pink';

type Props = {
  href: string;
  index: number;
  total: number;
  accent: Accent;
  metric: string;
  metricLabel: string;
  slug: string;
  start: string;
  end: string;
  role: string;
  company: string;
  tagline: string;
  summary: string;
  tags: readonly string[];
};

const accentText: Record<Accent, string> = {
  violet: 'text-violet-soft',
  mint: 'text-mint',
  pink: 'text-pink',
};
const accentBorder: Record<Accent, string> = {
  violet: 'hover:border-violet/40',
  mint: 'hover:border-mint/40',
  pink: 'hover:border-pink/40',
};
const accentGlow: Record<Accent, string> = {
  violet: 'var(--color-violet)',
  mint: 'var(--color-mint)',
  pink: 'var(--color-pink)',
};

export default function WorkCard(props: Props): ReactNode {
  const reduce = useReducedMotion();
  const accent = props.accent;

  return (
    <motion.a
      href={props.href}
      data-glow
      style={{ ['--glow-color' as string]: accentGlow[accent] }}
      initial={reduce ? false : { opacity: 0, y: 60, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: props.index * 0.08,
      }}
      whileHover={
        reduce
          ? undefined
          : {
              y: -6,
              scale: 1.005,
              transition: { type: 'spring', stiffness: 300, damping: 22 },
            }
      }
      className={`group relative block overflow-hidden rounded-2xl border border-white/5 bg-ink-2/40 p-8 transition-colors hover:bg-ink-3/40 sm:p-12 ${accentBorder[accent]}`}
    >
      <div className="grid gap-8 sm:grid-cols-12 sm:items-start">
        <div className="sm:col-span-3">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-paper-muted">
            /work/{props.slug}
          </p>
          <p className={`mt-4 font-display text-5xl font-semibold tracking-tight sm:text-6xl ${accentText[accent]}`}>
            {props.metric}
          </p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-paper-muted">
            {props.metricLabel}
          </p>
        </div>

        <div className="sm:col-span-9">
          <div className="flex items-center gap-3 font-mono text-[11px] text-paper-muted">
            <span>
              {props.start.split('-')[0]}–{props.end === 'present' ? 'now' : props.end.split('-')[0]}
            </span>
            <span className="opacity-30">·</span>
            <span>{props.role}</span>
          </div>
          <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl text-balance">
            {props.company}
          </h3>
          <p className="mt-4 max-w-2xl text-lg text-paper-dim text-pretty">{props.tagline}</p>
          <p className="mt-3 max-w-2xl text-paper-dim text-pretty">{props.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {props.tags.slice(0, 5).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-paper-dim"
              >
                {t}
              </span>
            ))}
          </div>
          <motion.div
            className="mt-8 inline-flex items-center gap-1.5 font-mono text-sm text-paper"
            whileHover={reduce ? undefined : { x: 6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            Read the case study
            <ArrowUpRight className="h-4 w-4" />
          </motion.div>
        </div>
      </div>
    </motion.a>
  );
}
