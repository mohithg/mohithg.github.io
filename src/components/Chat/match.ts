import { QNA, type QnA } from '../../lib/qna';

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
  'what', 'when', 'where', 'who', 'whom', 'which', 'why', 'how',
  'tell', 'explain', 'describe',
  'mohith', 'mohiths',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t && !STOPWORDS.has(t));
}

export function match(query: string): QnA | null {
  const tokens = tokenize(query);
  if (!tokens.length) return null;

  let best: { score: number; qna: QnA | null } = { score: 0, qna: null };

  for (const qna of QNA) {
    let score = 0;
    const haystack = new Set([
      ...qna.keywords.map((k) => k.toLowerCase()),
      ...qna.questions.flatMap((q) => tokenize(q)),
    ]);
    for (const t of tokens) {
      if (qna.keywords.includes(t)) score += 3;
      else if (haystack.has(t)) score += 2;
      else if ([...haystack].some((k) => k.includes(t) || t.includes(k))) score += 1;
    }
    if (score > best.score) best = { score, qna };
  }

  return best.score >= 2 ? best.qna : null;
}

export function fallback(): string {
  return [
    "I don't have a specific answer for that — this chat runs against a curated answer bank, not a live LLM (yet — that's coming).",
    '',
    'Try one of the suggested questions, or **email mohithgm@gmail.com** for anything specific.',
  ].join('\n');
}
