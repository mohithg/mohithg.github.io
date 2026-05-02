import { QNA, type QnA } from '../../lib/qna';

// stopwords that should never count toward a match
const STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'do', 'does', 'did', 'doing', 'have', 'has', 'had', 'having',
  'and', 'or', 'but', 'if', 'then', 'so', 'because', 'as',
  'of', 'to', 'in', 'on', 'at', 'by', 'for', 'with', 'about', 'against', 'between',
  'into', 'through', 'during', 'before', 'after', 'above', 'below',
  'from', 'up', 'down', 'out', 'off', 'over', 'under',
  'again', 'further', 'once',
  'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
  'my', 'your', 'his', 'its', 'our', 'their',
  'this', 'that', 'these', 'those',
  'what', 'when', 'where', 'who', 'whom', 'which', 'why', 'how', 'whose',
  'tell', 'explain', 'describe', 'show', 'give', 'know',
  'much', 'many', 'lot', 'lots',
  'just', 'really', 'very', 'also', 'too',
  'mohith', 'mohiths', 'his', 'mr',
  'can', 'could', 'should', 'would', 'will', 'shall', 'may', 'might',
  'something', 'anything', 'someone', 'anyone',
  'thing', 'things', 'kind',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

function score(qna: QnA, tokens: readonly string[]): number {
  if (!tokens.length) return 0;
  // Build a normalized search corpus per QnA
  const haystack = new Set([
    ...qna.keywords.map((k) => k.toLowerCase()),
    ...qna.questions.flatMap((q) => tokenize(q)),
    ...tokenize(qna.answer),
  ]);
  const haystackList = [...haystack];
  let s = 0;
  for (const t of tokens) {
    if (qna.keywords.includes(t)) s += 4;
    else if (haystack.has(t)) s += 2.5;
    else if (haystackList.some((k) => k === t || k.startsWith(t) || t.startsWith(k))) s += 1.5;
    else if (haystackList.some((k) => k.includes(t) || (t.length >= 4 && t.includes(k.slice(0, 4))))) s += 0.75;
  }
  return s;
}

export type MatchResult =
  | { kind: 'hit'; qna: QnA; alternatives: readonly QnA[] }
  | { kind: 'miss'; suggestions: readonly QnA[] };

export function match(query: string): MatchResult {
  const tokens = tokenize(query);
  const ranked = QNA
    .map((qna) => ({ qna, s: score(qna, tokens) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s);

  if (ranked.length === 0 || ranked[0].s < 1.5) {
    // No clear match. Surface the three highest-recall topics as suggestions.
    return {
      kind: 'miss',
      suggestions: QNA.slice(0, 3).map((q) => q),
    };
  }
  return {
    kind: 'hit',
    qna: ranked[0].qna,
    alternatives: ranked.slice(1, 4).map((r) => r.qna),
  };
}

export function fallbackText(): string {
  return [
    "I don't have that one in my answer bank yet. This v1 chat matches a curated set of questions instead of running a live LLM (cost reasons; live LLM is on the roadmap).",
    '',
    "Here's what I *can* answer:",
  ].join('\n');
}
