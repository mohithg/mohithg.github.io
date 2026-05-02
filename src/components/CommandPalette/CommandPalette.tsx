import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, ArrowRight, FileText, Mail, Linkedin, Sparkles, Home, User, Wrench, Hourglass, Code2, ExternalLink, BookOpen } from 'lucide-react';
import { SITE } from '../../lib/site';

type Cmd = {
  id: string;
  label: string;
  hint?: string;
  group: 'pages' | 'work' | 'actions' | 'social';
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string[];
  href?: string;
  onSelect?: () => void;
  external?: boolean;
};

function buildCommands(): Cmd[] {
  return [
    { id: 'home', label: 'Home', group: 'pages', icon: Home, href: '/' },
    { id: 'about', label: 'About', group: 'pages', icon: User, href: '/about' },
    { id: 'uses', label: 'Uses · tools, hardware, stack', group: 'pages', icon: Wrench, href: '/uses' },
    { id: 'now', label: 'Now · what I\'m working on', group: 'pages', icon: Hourglass, href: '/now' },

    { id: 'pp', label: 'PortfolioPilot', hint: 'first engineer · AI advisor', group: 'work', icon: FileText, href: '/work/portfoliopilot' },
    { id: 'ia', label: 'IntuitionAI → Domino', hint: 'founding eng · acq', group: 'work', icon: FileText, href: '/work/intuition-ai' },
    { id: 'rip', label: 'Rippling', hint: '2016 · production React', group: 'work', icon: FileText, href: '/work/rippling' },

    {
      id: 'chat',
      label: 'Chat with my career',
      hint: 'ask anything · ⌘ /',
      group: 'actions',
      icon: Sparkles,
      onSelect: () => {
        document.dispatchEvent(new CustomEvent('open-chat'));
      },
    },
    {
      id: 'email',
      label: 'Copy email · mohithgm@gmail.com',
      group: 'actions',
      icon: Mail,
      onSelect: async () => {
        try {
          await navigator.clipboard.writeText('mohithgm@gmail.com');
          toast('email copied');
        } catch {
          window.location.href = 'mailto:mohithgm@gmail.com';
        }
      },
    },
    { id: 'mail', label: 'Email Mohith', group: 'actions', icon: Mail, href: 'mailto:mohithgm@gmail.com', external: true },
    { id: 'resume', label: 'Open LinkedIn (résumé)', group: 'actions', icon: FileText, href: 'https://www.linkedin.com/in/mohithg', external: true },
    { id: 'src', label: 'View site source', group: 'actions', icon: Code2, href: 'https://github.com/mohithg/mohithg.github.io', external: true },

    { id: 'gh', label: 'GitHub', group: 'social', icon: BookOpen, href: 'https://github.com/mohithg', external: true },
    { id: 'li', label: 'LinkedIn', group: 'social', icon: Linkedin, href: 'https://www.linkedin.com/in/mohithg', external: true },
    { id: 'cp', label: 'Codepen', group: 'social', icon: Code2, href: 'https://codepen.io/mohithg', external: true },
    ...(SITE.blogEnabled
      ? [{ id: 'blog', label: 'Blog', group: 'social' as const, icon: BookOpen, href: SITE.blog, external: true }]
      : []),
  ];
}

function toast(text: string) {
  const el = document.createElement('div');
  el.textContent = text;
  el.className = 'fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-mint px-4 py-2 font-mono text-xs text-ink shadow-lg';
  el.style.transition = 'opacity 300ms';
  document.body.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 300);
  }, 1600);
}

const groupLabel: Record<Cmd['group'], string> = {
  pages: 'pages',
  work: 'work',
  actions: 'actions',
  social: 'elsewhere',
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const cmds = useMemo(() => buildCommands(), []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return cmds;
    return cmds.filter((c) =>
      [c.label, c.hint ?? '', c.id].some((s) => s.toLowerCase().includes(query))
    );
  }, [q, cmds]);

  // group filtered for rendering
  const grouped = useMemo(() => {
    const m = new Map<Cmd['group'], Cmd[]>();
    for (const c of filtered) {
      const arr = m.get(c.group) ?? [];
      arr.push(c);
      m.set(c.group, arr);
    }
    return m;
  }, [filtered]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
        setQ('');
        setActive(0);
        return;
      }
      if (e.key === 'Escape' && open) {
        setOpen(false);
        return;
      }
      if (!open) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((i) => Math.min(filtered.length - 1, i + 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const c = filtered[active];
        if (c) runCommand(c);
      }
    };
    window.addEventListener('keydown', onKey);

    const onTrigger = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest('[data-cmd-k-trigger]')) {
        e.preventDefault();
        setOpen(true);
        setQ('');
        setActive(0);
      }
    };
    document.addEventListener('click', onTrigger);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onTrigger);
    };
  }, [open, filtered, active]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => setActive(0), [q]);

  function runCommand(c: Cmd) {
    setOpen(false);
    if (c.onSelect) {
      c.onSelect();
      return;
    }
    if (c.href) {
      if (c.external || c.href.startsWith('mailto:') || c.href.startsWith('http')) {
        window.open(c.href, c.external ? '_blank' : '_self');
      } else {
        window.location.href = c.href;
      }
    }
  }

  if (!open) return null;

  let cursor = 0;
  return (
    <>
      <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden />
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
        <div role="dialog" aria-label="Command palette" className="w-full max-w-xl rounded-2xl border border-white/10 bg-ink-2 shadow-2xl overflow-hidden">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <Search className="h-4 w-4 text-paper-dim" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search pages, work, actions…"
              className="flex-1 bg-transparent font-mono text-sm text-paper placeholder:text-paper-muted focus:outline-none"
            />
            <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-paper-dim">esc</kbd>
          </div>

          <div className="max-h-[55vh] overflow-y-auto p-2">
            {filtered.length === 0 && (
              <p className="px-4 py-8 text-center font-mono text-sm text-paper-muted">no matches.</p>
            )}
            {Array.from(grouped.entries()).map(([group, items]) => (
              <div key={group} className="mb-2">
                <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-widest text-paper-muted">
                  / {groupLabel[group]}
                </p>
                {items.map((c) => {
                  const isActive = filtered[active]?.id === c.id;
                  cursor++;
                  return (
                    <button
                      key={c.id}
                      onMouseEnter={() => setActive(filtered.findIndex((f) => f.id === c.id))}
                      onClick={() => runCommand(c)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                        isActive ? 'bg-violet/10 text-paper' : 'text-paper-dim hover:bg-white/[0.03]'
                      }`}
                    >
                      <c.icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-violet-soft' : 'text-paper-muted'}`} />
                      <span className="flex-1">
                        <span className="block text-sm">{c.label}</span>
                        {c.hint && <span className="block font-mono text-[10px] text-paper-muted">{c.hint}</span>}
                      </span>
                      {c.external ? <ExternalLink className="h-3 w-3 text-paper-muted" /> : <ArrowRight className={`h-3.5 w-3.5 ${isActive ? 'text-violet-soft' : 'text-paper-muted opacity-0 group-hover:opacity-100'}`} />}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-white/10 bg-ink-3/40 px-4 py-2 font-mono text-[10px] text-paper-muted">
            <span className="flex items-center gap-3">
              <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">↑↓</kbd> navigate
              <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">↵</kbd> select
            </span>
            <span>{filtered.length} results</span>
          </div>
        </div>
      </div>
    </>
  );
}
