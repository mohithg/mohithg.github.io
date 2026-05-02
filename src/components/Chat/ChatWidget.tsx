import { useEffect, useRef, useState } from 'react';
import { Send, Sparkles, X, ArrowUpRight } from 'lucide-react';
import { match, fallback } from './match';
import { SUGGESTED_QUESTIONS, QNA } from '../../lib/qna';

type Msg =
  | { id: string; role: 'user'; text: string }
  | { id: string; role: 'assistant'; text: string; citations?: { label: string; href: string }[]; streaming?: boolean };

const greet: Msg = {
  id: 'greet',
  role: 'assistant',
  text: "Hi — I'm a chat over Mohith's career. Ask me anything from the suggestions below, or type your own.\n\n*v1 runs against a curated answer bank — a live LLM version is coming soon.*",
};

function renderMarkdown(text: string): string {
  // very small subset: bold, italics, links
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="underline decoration-violet/40 underline-offset-4 hover:decoration-violet">$1</a>');
  return html.replace(/\n\n/g, '<br/><br/>').replace(/\n/g, '<br/>');
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([greet]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // global triggers: ⌘ /, [data-chat-trigger], close on Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);

    const onTrigger = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest('[data-chat-trigger]')) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('click', onTrigger);

    const onCustomOpen = () => setOpen(true);
    document.addEventListener('open-chat', onCustomOpen);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onTrigger);
      document.removeEventListener('open-chat', onCustomOpen);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [msgs]);

  async function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || busy) return;
    const userMsg: Msg = { id: `u-${Date.now()}`, role: 'user', text: trimmed };
    const placeholder: Msg = { id: `a-${Date.now()}`, role: 'assistant', text: '', streaming: true };
    setMsgs((m) => [...m, userMsg, placeholder]);
    setInput('');
    setBusy(true);

    const matched = match(trimmed);
    const answer = matched ? matched.answer : fallback();
    const citations = matched?.citations;

    // simulate streaming
    const tokens = answer.split(/(\s+)/);
    let acc = '';
    for (const tok of tokens) {
      acc += tok;
      await new Promise((r) => setTimeout(r, 12 + Math.random() * 18));
      setMsgs((m) => m.map((msg) => (msg.id === placeholder.id ? { ...msg, text: acc } : msg)));
    }
    setMsgs((m) =>
      m.map((msg): Msg =>
        msg.id === placeholder.id && msg.role === 'assistant'
          ? { ...msg, streaming: false, citations: citations ? [...citations] : undefined }
          : msg
      )
    );
    setBusy(false);
  }

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Chat with my career"
        className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink-2/80 px-4 py-3 backdrop-blur-md transition-all hover:scale-105 hover:border-violet/40 hover:bg-ink-3/80 sm:bottom-7 sm:right-7"
        style={{ display: open ? 'none' : undefined }}
      >
        <Sparkles className="h-4 w-4 text-violet-soft" />
        <span className="hidden font-mono text-xs text-paper sm:inline">chat with my career</span>
        <kbd className="hidden rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-paper-dim sm:inline">⌘ /</kbd>
      </button>

      {/* Panel */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <aside
            role="dialog"
            aria-label="Chat with my career"
            className="fixed bottom-0 right-0 z-50 flex h-[min(640px,90dvh)] w-full max-w-md flex-col overflow-hidden border-white/10 bg-ink-2 shadow-2xl sm:bottom-5 sm:right-5 sm:rounded-2xl sm:border"
          >
            {/* Header */}
            <header className="relative isolate flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="pointer-events-none absolute inset-0 -z-10 opacity-50">
                <div className="absolute -inset-10 bg-gradient-to-br from-violet/20 via-transparent to-mint/10 blur-2xl" />
              </div>
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-ink-3">
                  <Sparkles className="h-4 w-4 text-violet-soft" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink-2 bg-mint" />
                </div>
                <div>
                  <p className="font-display text-sm font-semibold text-paper">chat with my career</p>
                  <p className="font-mono text-[10px] text-paper-muted">v1 · curated answers · {QNA.length} entries</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-1.5 text-paper-dim transition-colors hover:bg-white/5 hover:text-paper"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
              {msgs.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={
                      m.role === 'user'
                        ? 'max-w-[85%] rounded-2xl rounded-br-md bg-violet/15 px-3.5 py-2 text-sm text-paper'
                        : 'max-w-[90%] rounded-2xl rounded-bl-md bg-ink-3/70 px-3.5 py-2.5 text-sm text-paper-dim'
                    }
                  >
                    <span dangerouslySetInnerHTML={{ __html: renderMarkdown(m.text || '') }} />
                    {m.role === 'assistant' && m.streaming && (
                      <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-violet-soft align-middle" aria-hidden="true" />
                    )}
                    {m.role === 'assistant' && m.citations && m.citations.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5 border-t border-white/5 pt-2">
                        {m.citations.map((c) => (
                          <a
                            key={c.href}
                            href={c.href}
                            className="inline-flex items-center gap-1 rounded-full border border-violet/30 bg-violet/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-violet-soft hover:border-violet/60 hover:text-paper"
                          >
                            {c.label}
                            <ArrowUpRight className="h-2.5 w-2.5" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {msgs.length === 1 && (
                <div className="flex flex-col gap-2 pt-2">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-paper-muted">try asking</p>
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => ask(q)}
                      className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-left text-sm text-paper-dim transition-colors hover:border-violet/30 hover:bg-violet/5 hover:text-paper"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="border-t border-white/10 bg-ink-3/30 p-3"
            >
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-ink-2/60 px-3 py-2 focus-within:border-violet/40">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about Mohith's career…"
                  disabled={busy}
                  className="flex-1 bg-transparent text-sm text-paper placeholder:text-paper-muted focus:outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={busy || !input.trim()}
                  aria-label="Send"
                  className="rounded-lg bg-violet/20 p-1.5 text-violet-soft transition-colors hover:bg-violet/30 hover:text-paper disabled:opacity-30"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 px-1 font-mono text-[10px] text-paper-muted">
                no API keys, no costs · matches against a curated answer bank
              </p>
            </form>
          </aside>
        </>
      )}
    </>
  );
}

