// Build OG cards (1200x630) for the home page and every case study.
// Each card shares the same skeleton (mg mark, eyebrow, title, sub, footer)
// but uses an accent color and per-page copy. Run automatically before
// every astro build via the npm `build` script.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const ACCENTS = {
  mint:   { glow: '#00E5A0', text: '#00E5A0' },
  violet: { glow: '#7C5CFF', text: '#A088FF' },
  pink:   { glow: '#FF5C8A', text: '#FF5C8A' },
  paper:  { glow: '#7C5CFF', text: '#F5F5F0' },
};

const PAGES = [
  // Home / default share card
  {
    out: 'og/default.png',
    accent: 'paper',
    eyebrow: 'PRODUCT  ENGINEER  ·  AI  ·  11Y',
    headline: ['I ship any product', 'with AI in every layer.', 'infra. DAGs. APIs. UI.'],
    headlineColor: { 0: '#F5F5F0', 1: '#9B9B9B', 2: '#A088FF' },
    sub: 'First engineer · PortfolioPilot.com',
    decoration: 'dag',
  },

  // Case studies
  {
    out: 'og/portfoliopilot.png',
    accent: 'mint',
    eyebrow: '/  WORK  /  PORTFOLIOPILOT',
    headline: ['PortfolioPilot.', 'SEC-registered AI', 'financial advisor.'],
    headlineColor: { 0: '#F5F5F0', 1: '#00E5A0', 2: '#F5F5F0' },
    sub: 'First engineer · hedge-fund-grade quant engine · 2021 → now',
  },
  {
    out: 'og/intuition-ai.png',
    accent: 'violet',
    eyebrow: '/  WORK  /  INTUITION-AI  →  DOMINO',
    headline: ['IntuitionAI', 'acquired by', 'Domino Data Lab.'],
    headlineColor: { 0: '#F5F5F0', 1: '#A088FF', 2: '#F5F5F0' },
    sub: 'Founding engineer · model monitoring before it was a category · 2017–2021',
  },
  {
    out: 'og/navya.png',
    accent: 'mint',
    eyebrow: '/  WORK  /  NAVYA',
    headline: ['Navya.Care.', 'Cancer second', 'opinion, India ↔ US.'],
    headlineColor: { 0: '#F5F5F0', 1: '#00E5A0', 2: '#F5F5F0' },
    sub: 'Full-stack · AWS Lambda when Lambda was new · 2016–2017',
  },
  {
    out: 'og/rippling.png',
    accent: 'pink',
    eyebrow: '/  WORK  /  RIPPLING',
    headline: ['Rippling.', 'Production React', 'in 2016.'],
    headlineColor: { 0: '#F5F5F0', 1: '#FF5C8A', 2: '#F5F5F0' },
    sub: 'Year+ via Codebrahma · the Dan Abramov tweet · 2016–2017',
  },
  {
    out: 'og/codebrahma.png',
    accent: 'pink',
    eyebrow: '/  WORK  /  CODEBRAHMA',
    headline: ['Codebrahma.', 'Lendwell, Rippling,', 'a Dan Abramov tweet.'],
    headlineColor: { 0: '#F5F5F0', 1: '#FF5C8A', 2: '#F5F5F0' },
    sub: 'React-first dev shop · the early-React era · 2015–2017',
  },
  {
    out: 'og/athena.png',
    accent: 'violet',
    eyebrow: '/  WORK  /  ATHENAHEALTH',
    headline: ['AthenaHealth.', 'Whole architecture.', 'HIPAA, baked in.'],
    headlineColor: { 0: '#F5F5F0', 1: '#A088FF', 2: '#F5F5F0' },
    sub: 'First job out of college · Perl · 2015',
  },
  {
    out: 'og/about.png',
    accent: 'paper',
    eyebrow: '/  ABOUT',
    headline: ['Hi, I’m Mohith.', 'Product Engineer.', '11 years shipping.'],
    headlineColor: { 0: '#F5F5F0', 1: '#A088FF', 2: '#9B9B9B' },
    sub: 'Founding engineer for AI products. Bengaluru.',
  },

  // Writing index + per-pillar OGs
  {
    out: 'og/writing.png',
    accent: 'paper',
    eyebrow: '/  WRITING',
    headline: ['Notes on building', 'AI products.', 'No clichés.'],
    headlineColor: { 0: '#F5F5F0', 1: '#A088FF', 2: '#9B9B9B' },
    sub: 'Essays on prompts, evals, agents, economics, product engineering.',
  },
  {
    out: 'og/writing-prompts.png',
    accent: 'violet',
    eyebrow: '/  WRITING  /  PROMPTS',
    headline: ['Prompts as', 'API contracts.', 'Treat words like APIs.'],
    headlineColor: { 0: '#F5F5F0', 1: '#A088FF', 2: '#9B9B9B' },
    sub: 'The hidden interface between your AI and your engineers.',
  },
  {
    out: 'og/writing-evals.png',
    accent: 'mint',
    eyebrow: '/  WRITING  /  EVALS',
    headline: ['LLM eval', 'engineering.', 'Catch the real bugs.'],
    headlineColor: { 0: '#F5F5F0', 1: '#00E5A0', 2: '#9B9B9B' },
    sub: 'Test benches for AI features that catch bugs you actually care about.',
  },
  {
    out: 'og/writing-agents.png',
    accent: 'pink',
    eyebrow: '/  WRITING  /  AGENTS',
    headline: ['Agent', 'architecture.', 'Patterns that ship.'],
    headlineColor: { 0: '#F5F5F0', 1: '#FF5C8A', 2: '#9B9B9B' },
    sub: 'Loops, tool calls, state, observability. The patterns that ship in production.',
  },
  {
    out: 'og/writing-economics.png',
    accent: 'mint',
    eyebrow: '/  WRITING  /  ECONOMICS',
    headline: ['Napkin math', 'for AI in prod.', 'The numbers nobody publishes.'],
    headlineColor: { 0: '#F5F5F0', 1: '#00E5A0', 2: '#9B9B9B' },
    sub: 'Cost per request, latency budgets, when caching wins.',
  },
  {
    out: 'og/writing-product.png',
    accent: 'violet',
    eyebrow: '/  WRITING  /  PRODUCT',
    headline: ['AI product', 'engineering.', 'Substance, then surface.'],
    headlineColor: { 0: '#F5F5F0', 1: '#A088FF', 2: '#9B9B9B' },
    sub: 'Building things people use, not demos that wow.',
  },
  {
    out: 'og/writing-retrieval.png',
    accent: 'mint',
    eyebrow: '/  WRITING  /  RETRIEVAL',
    headline: ['Retrieval', 'and RAG.', 'The unsexy half.'],
    headlineColor: { 0: '#F5F5F0', 1: '#00E5A0', 2: '#9B9B9B' },
    sub: 'Indexing, chunking, reranking, hybrid search. The work behind the answers.',
  },
  {
    out: 'og/writing-safety.png',
    accent: 'pink',
    eyebrow: '/  WRITING  /  SAFETY',
    headline: ['AI safety', 'and guardrails.', 'Engineering, not philosophy.'],
    headlineColor: { 0: '#F5F5F0', 1: '#FF5C8A', 2: '#9B9B9B' },
    sub: 'Prompt injection, jailbreaks, content moderation, red teaming.',
  },
  {
    out: 'og/writing-infra.png',
    accent: 'violet',
    eyebrow: '/  WRITING  /  INFRA',
    headline: ['AI', 'infrastructure.', 'The boring critical path.'],
    headlineColor: { 0: '#F5F5F0', 1: '#A088FF', 2: '#9B9B9B' },
    sub: 'Serving, deployment, MCP, GPU economics. Plumbing that decides if you scale.',
  },
];

function svgFor(page) {
  const { glow } = ACCENTS[page.accent];
  const headline = page.headline;
  const colors = page.headlineColor;
  const decoration = page.decoration === 'dag'
    ? `<g transform="translate(820,80)" opacity="0.85">
        <circle cx="0" cy="60" r="6" fill="#7C5CFF"/>
        <circle cx="80" cy="20" r="6" fill="#7C5CFF"/>
        <circle cx="80" cy="100" r="6" fill="#7C5CFF"/>
        <circle cx="160" cy="60" r="6" fill="#00E5A0"/>
        <circle cx="240" cy="60" r="8" fill="#00E5A0"/>
        <path d="M 6 60 L 76 24" stroke="url(#edge)" stroke-width="1.5"/>
        <path d="M 6 60 L 76 96" stroke="url(#edge)" stroke-width="1.5"/>
        <path d="M 84 24 L 156 56" stroke="url(#edge)" stroke-width="1.5"/>
        <path d="M 84 96 L 156 64" stroke="url(#edge)" stroke-width="1.5"/>
        <path d="M 168 60 L 234 60" stroke="url(#edge)" stroke-width="1.5"/>
      </g>`
    : '';

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#0A0A0F"/>
      <stop offset="1" stop-color="#1A1A24"/>
    </linearGradient>
    <radialGradient id="leftGlow" cx="22%" cy="40%" r="35%">
      <stop offset="0" stop-color="${glow}" stop-opacity="0.42"/>
      <stop offset="1" stop-color="${glow}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="rightGlow" cx="80%" cy="80%" r="35%">
      <stop offset="0" stop-color="#00E5A0" stop-opacity="0.30"/>
      <stop offset="1" stop-color="#00E5A0" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="0.8" fill="#FFFFFF" fill-opacity="0.06"/>
    </pattern>
    <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#7C5CFF"/>
      <stop offset="1" stop-color="#00E5A0"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#dots)"/>
  <rect width="1200" height="630" fill="url(#leftGlow)"/>
  <rect width="1200" height="630" fill="url(#rightGlow)"/>

  ${decoration}

  <!-- Logo block -->
  <g transform="translate(80,80)">
    <rect x="0" y="0" width="64" height="64" rx="14" fill="#0A0A0F" stroke="#7C5CFF" stroke-opacity="0.5" stroke-width="1"/>
    <path d="M14 44 L14 26 Q14 22 18 22 Q22 22 22 26 L22 44 M22 28 Q22 22 26 22 Q30 22 30 28 L30 44" stroke="#F5F5F0" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M50 22 L50 46 Q50 52 44 52 Q38 52 38 47 M50 28 Q50 22 44 22 Q36 22 36 32 Q36 42 44 42 Q50 42 50 36 L50 28" stroke="#F5F5F0" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <text x="80" y="42" font-family="ui-sans-serif, sans-serif" font-size="22" font-weight="500" fill="#9B9B9B" letter-spacing="-0.5">mohith g</text>
  </g>

  <!-- Eyebrow -->
  <text x="80" y="220" font-family="ui-monospace, monospace" font-size="18" letter-spacing="6" fill="#9B9B9B">${escapeXml(page.eyebrow)}</text>

  <!-- Headline (3 lines) -->
  <text x="80" y="318" font-family="ui-sans-serif, sans-serif" font-size="76" font-weight="700" fill="${colors[0]}" letter-spacing="-2.5">${escapeXml(headline[0])}</text>
  <text x="80" y="408" font-family="ui-sans-serif, sans-serif" font-size="76" font-weight="700" fill="${colors[1]}" letter-spacing="-2.5">${escapeXml(headline[1])}</text>
  <text x="80" y="498" font-family="ui-sans-serif, sans-serif" font-size="76" font-weight="700" fill="${colors[2]}" letter-spacing="-2.5">${escapeXml(headline[2])}</text>

  <!-- Bottom strip -->
  <line x1="80" y1="555" x2="1120" y2="555" stroke="#FFFFFF" stroke-opacity="0.08"/>
  <text x="80" y="595" font-family="ui-monospace, monospace" font-size="18" fill="#9B9B9B">${escapeXml(page.sub)}</text>
  <text x="1120" y="595" text-anchor="end" font-family="ui-monospace, monospace" font-size="18" fill="#9B9B9B">mohithg.com</text>
</svg>`;
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const outDir = resolve(root, 'public/og');
await mkdir(outDir, { recursive: true });

for (const page of PAGES) {
  const out = resolve(root, 'public', page.out);
  await mkdir(dirname(out), { recursive: true });
  await sharp(Buffer.from(svgFor(page))).png({ quality: 92 }).toFile(out);
  console.log(`Wrote ${page.out}`);
}
