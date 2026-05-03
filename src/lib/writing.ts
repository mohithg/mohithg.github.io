// Pillar metadata for the /writing section. Drives the writing index
// grouping, OG image selection, and pillar-page navigation.

export type Pillar = {
  id: 'prompts' | 'evals' | 'agents' | 'economics' | 'product' | 'retrieval' | 'safety' | 'infra';
  title: string;
  blurb: string;
  accent: 'violet' | 'mint' | 'pink' | 'paper';
};

export const PILLARS: readonly Pillar[] = [
  {
    id: 'prompts',
    title: 'Prompts as API contracts',
    blurb: 'The words an LLM is allowed to use are themselves an interface. Treat them like one.',
    accent: 'violet',
  },
  {
    id: 'evals',
    title: 'LLM eval engineering',
    blurb: 'Test benches for AI features that catch the bugs you actually care about.',
    accent: 'mint',
  },
  {
    id: 'agents',
    title: 'Agent architecture',
    blurb: 'Loops, tool calls, state, observability. The patterns that ship in production.',
    accent: 'pink',
  },
  {
    id: 'retrieval',
    title: 'Retrieval and RAG',
    blurb: 'The unsexy half of every AI product. Indexing, chunking, reranking, hybrid search.',
    accent: 'mint',
  },
  {
    id: 'safety',
    title: 'AI safety and guardrails',
    blurb: 'Prompt injection, jailbreaks, content moderation. Engineering discipline, not philosophy.',
    accent: 'pink',
  },
  {
    id: 'infra',
    title: 'AI infrastructure',
    blurb: 'Serving, deployment, MCP, GPU economics. The plumbing that decides if you scale.',
    accent: 'violet',
  },
  {
    id: 'economics',
    title: 'The napkin math of AI in production',
    blurb: 'Cost per request, latency budgets, when caching wins. The numbers nobody publishes.',
    accent: 'mint',
  },
  {
    id: 'product',
    title: 'AI product engineering',
    blurb: 'Building things people use, not demos that wow. Substance first, surface second.',
    accent: 'violet',
  },
];

export const pillarById = (id: Pillar['id']): Pillar =>
  PILLARS.find((p) => p.id === id) ?? PILLARS[0];

export type Post = {
  url: string;
  slug: string;
  title: string;
  description: string;
  publishDate: string;
  pillar: Pillar['id'];
  readingTime: string;
};

export function readingTime(text: string): string {
  const words = text.split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}
