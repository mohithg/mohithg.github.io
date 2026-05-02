// Curated Q&A corpus used by the "Chat with my career" widget.
// The chat does keyword + token matching against this corpus.
// In a future phase we'll route through Cloudflare Workers AI for free-form Q&A.

export type QnA = {
  id: string;
  questions: readonly string[]; // canonical phrasings
  keywords: readonly string[]; // weighted search terms
  answer: string; // markdown-lite supported (links + bold)
  citations?: readonly { label: string; href: string }[];
};

export const SUGGESTED_QUESTIONS = [
  'What did Mohith ship at PortfolioPilot?',
  'Tell me about the IntuitionAI acquisition.',
  'What\'s his strongest stack — frontend, backend, or AI?',
  'Why should I hire him as a founding engineer?',
  'What\'s the Dan Abramov tweet story?',
  'How does he think about AI evals?',
] as const;

export const QNA: readonly QnA[] = [
  {
    id: 'pp-overview',
    questions: ['What did Mohith ship at PortfolioPilot?', 'What does he do at PortfolioPilot?', 'Global Predictions work', 'Tell me about PortfolioPilot'],
    keywords: ['portfoliopilot', 'pilot', 'global', 'predictions', 'financial', 'advisor', 'first', 'engineer', 'ai', 'currently', 'today', 'now', 'job', 'role'],
    answer:
      'Mohith is the **first engineer** at PortfolioPilot (Global Predictions), since June 2021. He bootstrapped the codebase, built the financial-data ingestion DAGs, the recommendation engine, and the AI advisor stack — including one of the **first wave of ChatGPT plugins** in 2023, the GPTs migration, and a custom agent runtime today. He owns the **eval & guardrail layer** that catches bad financial advice before it ships, and is still actively shipping the surfaces that decide whether the AI is right.',
    citations: [{ label: 'PortfolioPilot case study', href: '/work/portfoliopilot' }],
  },
  {
    id: 'evals',
    questions: ['How does he think about AI evals?', 'What\'s his eval philosophy?', 'evaluation systems', 'guardrails for AI'],
    keywords: ['eval', 'evals', 'evaluation', 'guardrail', 'guardrails', 'rubric', 'judge', 'shadow', 'production', 'rag', 'safety', 'correctness', 'hallucination', 'hallucinations'],
    answer:
      '"**Evals before features** in any AI product." Every team Mohith has watched ship LLM features has had the same six-month epiphany — they should have built the eval bench *first*. At PortfolioPilot the eval system runs in three modes: **continuous** (every PR), **deep** (every prompt or model change, with an LLM judge plus human spot-checks), and **production shadow** (against anonymized real traffic). The hard part isn\'t the framework — it\'s the **rubric**, which has to be discovered by reading every transcript where the AI was wrong and distilling failure modes into rules.',
    citations: [{ label: 'See: PortfolioPilot — A hard problem, solved', href: '/work/portfoliopilot' }],
  },
  {
    id: 'intuition-ai',
    questions: ['Tell me about the IntuitionAI acquisition.', 'How did the IntuitionAI/Domino story go?', 'Founding engineer story'],
    keywords: ['intuition', 'intuitionai', 'acquisition', 'acquired', 'exit', 'domino', 'datalab', 'data', 'founding', 'monitoring', 'drift', 'mlops', 'ml'],
    answer:
      'Mohith was the **founding engineer at [IntuitionAI](https://intuition.ai)** in 2017 — building model monitoring (drift, data-quality, prediction logging) before model monitoring was a category. The company was acquired by **Domino Data Lab in 2018**. He stayed at Domino for **three years**, working on their core platform: real-time systems, customer-facing on-call, and an architecture revamp of significant portions of the codebase using a strangler-fig pattern. The model-monitoring product is still part of Domino\'s story.',
    citations: [{ label: 'IntuitionAI → Domino case study', href: '/work/intuition-ai' }],
  },
  {
    id: 'rippling',
    questions: ['What did Mohith do at Rippling?', 'Rippling work history', 'YC startup experience'],
    keywords: ['rippling', 'parker', 'conrad', 'codebrahma', 'react', '2016', 'yc', 'hr', 'hris', 'zenefits'],
    answer:
      'In early 2016, through Codebrahma, Mohith built early product surfaces for **Rippling** — Parker Conrad\'s next company after Zenefits, now valued at $13B+. He spent seven months shipping complex React UI when "production React" was still a sentence that needed a footnote. The work earned a **tweet from Dan Abramov** about the production React coming out of Codebrahma, at a time when senior React tweets were the closest thing the ecosystem had to peer review.',
    citations: [{ label: 'Rippling case study', href: '/work/rippling' }],
  },
  {
    id: 'dan-abramov',
    questions: ['What\'s the Dan Abramov tweet story?', 'Tell me about the React tweet'],
    keywords: ['dan', 'abramov', 'tweet', 'tweeted', 'twitter', 'recognition', 'famous'],
    answer:
      'In 2016, **Dan Abramov** (creator of React, Redux) tweeted about the production React work coming out of **Codebrahma** during the period Mohith was there shipping Rippling. Production React was rare in 2016 — patterns weren\'t settled, hooks were three years away, Redux was a few months old. Anyone shipping non-trivial React was learning by writing. The Codebrahma work got attention because it picked the right patterns and committed to them.',
    citations: [{ label: 'See: Rippling case study', href: '/work/rippling' }],
  },
  {
    id: 'stack',
    questions: ['What\'s his strongest stack — frontend, backend, or AI?', 'What\'s his best layer?', 'specialty', 'What does he specialize in'],
    keywords: ['frontend', 'backend', 'fullstack', 'full-stack', 'stack', 'specialty', 'strongest', 'best', 'product', 'engineer', 'specialize', 'specialization', 'role'],
    answer:
      'Mohith identifies as a **Product Engineer**, not a specialist — the question he\'s solving is always *"what does the product need next?"* not *"which layer am I in?"* He\'s shipped at every layer: design → DAGs → frontend (React since 2015) → backend (Python, Node) → DB (Postgres) → infra (K8s, AWS) → AI (LLM agents, evals, RAG). His strongest signal is **judgment under ambiguity** — picking what to build, in what order, with which trade-offs, on a small team where there\'s no one to defer to.',
  },
  {
    id: 'languages',
    questions: ['What programming languages does he use?', 'What languages does he know?', 'Tech stack', 'What technologies'],
    keywords: ['language', 'languages', 'programming', 'python', 'typescript', 'javascript', 'react', 'node', 'sql', 'postgres', 'perl', 'scala', 'kafka', 'lambda', 'tech', 'technology', 'technologies', 'framework', 'frameworks'],
    answer:
      'Daily: **Python** (FastAPI, Django, Celery), **TypeScript / React** (since 2015 — first React-to-prod earned a Dan Abramov tweet), **SQL** (mostly Postgres). Infra: **AWS, Kubernetes, Docker, Cloudflare**. AI: **Claude, OpenAI, pgvector, custom eval bench**. Across his career has shipped **Perl** (AthenaHealth), **AWS Lambda** (Navya, when Lambda was brand new), **Kafka + Python + React** (IntuitionAI), and **Scala + React** (Domino). Full list on the [/uses](/uses) page.',
    citations: [{ label: '/uses', href: '/uses' }],
  },
  {
    id: 'ai-products',
    questions: ['What AI products has he shipped?', 'What kind of AI work has he done?', 'LLM experience', 'agent experience'],
    keywords: ['ai', 'llm', 'gpt', 'plugin', 'plugins', 'agent', 'agents', 'rag', 'retrieval', 'chatgpt', 'openai', 'claude', 'anthropic', 'model', 'models', 'prompt', 'prompts'],
    answer:
      'At PortfolioPilot: one of the **first ChatGPT plugins** (financial Q&A over portfolio data, early 2023), then the **GPTs migration**, then a **custom agent runtime** with tool-calling, streaming UI, and evals. Plus the in-product daily AI advisor and the recommendation engine. At IntuitionAI: model monitoring as a product — drift, data quality, prediction logging — productized for enterprise ML teams.',
    citations: [{ label: 'PortfolioPilot case study', href: '/work/portfoliopilot' }],
  },
  {
    id: 'react',
    questions: ['Tell me about his React work', 'Frontend experience', 'How long has he done React?'],
    keywords: ['react', 'frontend', 'ui', 'jsx', 'hooks', 'redux', 'next', 'nextjs', 'remix', 'astro', 'design', 'system', 'component', 'components'],
    answer:
      '**React since 2015** — one of the early production-React engineers in India. Shipped his first React app to production at **Codebrahma**, which earned a **Dan Abramov tweet** in 2016. Built early product surfaces at **Rippling** (now $13B+) and the entire **PortfolioPilot** product UI as the first engineer there. Comfortable across the modern frontend stack: hooks, server components, Suspense, Tailwind, Astro Islands.',
    citations: [{ label: 'Rippling case study', href: '/work/rippling' }],
  },
  {
    id: 'infra',
    questions: ['Does he do DevOps?', 'Infra and Kubernetes experience', 'Can he scale things?'],
    keywords: ['devops', 'infra', 'infrastructure', 'kubernetes', 'k8s', 'aws', 'cloud', 'docker', 'scale', 'scaling', 'deploy', 'deployment', 'observability', 'cost', 'sre'],
    answer:
      'Yes. AWS / GCP, **Kubernetes** in production, Docker, Postgres operations, observability (traces, metrics, structured logs), cost-aware architecture. Has stood up greenfield infra (PortfolioPilot, IntuitionAI), inherited and revamped existing infra (Domino), and shipped real-time systems where latency matters. Prefers managed services unless there\'s a strong reason not to.',
  },
  {
    id: 'opensource',
    questions: ['Open source contributions', 'GitHub work', 'has he contributed to OSS?'],
    keywords: ['open', 'source', 'oss', 'github', 'npm', 'contribute', 'contribution', 'contributions', 'maintainer'],
    answer:
      'Contributions across the **npm ecosystem**, including [handsontable](http://handsontable.com) and a number of smaller libraries published as part of the React era at Codebrahma. GitHub is at [github.com/mohithg](https://github.com/mohithg). Codepen at [codepen.io/mohithg](https://codepen.io/mohithg).',
    citations: [{ label: 'GitHub', href: 'https://github.com/mohithg' }],
  },
  {
    id: 'hire',
    questions: ['Why should I hire him as a founding engineer?', 'Why hire Mohith?', 'What makes him a good fit?', 'Should I hire him?'],
    keywords: ['hire', 'hiring', 'founding', 'fit', 'good', 'available', 'open', 'looking', 'recruit', 'job', 'position', 'opportunity'],
    answer:
      'Three signals worth weighting: **(1)** He\'s done it before — founding engineer at IntuitionAI through acquisition, first engineer at PortfolioPilot for five years and counting. **(2)** He ships AI in production, not demos — the eval layer he built at PortfolioPilot is what separates AI features that survive from ones that get rolled back. **(3)** He spans the entire stack with judgment, which is what early-stage teams actually need. He\'s open to **founding-engineer or first-AI-engineer roles at AI-forward seed-to-Series-A teams**.',
    citations: [
      { label: 'Reach out', href: 'mailto:mohithgm@gmail.com' },
      { label: 'About', href: '/about' },
    ],
  },
  {
    id: 'years',
    questions: ['How many years of experience does he have?', 'How long has he been doing this?', 'How experienced is he?'],
    keywords: ['year', 'years', 'experience', 'experienced', 'long', 'old', 'seniority', 'senior', 'junior'],
    answer:
      '**11+ years** of professional engineering, since 2014. Started at **AthenaHealth**, then **Codebrahma** (where he shipped his first production React app and got the Dan Abramov tweet), then **Rippling** via Codebrahma, then **Navya**, then founding engineer at **IntuitionAI** (acquired by Domino), three years at **Domino**, then first engineer at **PortfolioPilot** from June 2021.',
  },
  {
    id: 'education',
    questions: ['Where did he study?', 'What\'s his education?', 'Degree?', 'Did he go to college?'],
    keywords: ['education', 'study', 'studied', 'degree', 'university', 'college', 'school', 'gold', 'medalist', 'topper', 'student', 'graduate', 'cs', 'computer', 'science'],
    answer:
      'Computer Science, **gold medalist** and **batch topper** at **[Saveetha Engineering College](https://saveetha.ac.in)**, affiliated with **Anna University**.',
  },
  {
    id: 'location',
    questions: ['Where does he live?', 'Where is he based?', 'Remote?', 'Timezone'],
    keywords: ['location', 'live', 'lives', 'based', 'where', 'remote', 'bengaluru', 'bangalore', 'india', 'timezone', 'tz', 'travel', 'relocate'],
    answer:
      '**Bengaluru, India**. Has worked remotely with US-based teams since 2018 (Domino, Global Predictions). Comfortable with overlap hours, SF hours when needed.',
  },
  {
    id: 'contact',
    questions: ['How do I reach him?', 'Contact info', 'How to get in touch', 'Email'],
    keywords: ['contact', 'reach', 'email', 'message', 'touch', 'linkedin', 'dm', 'phone', 'call'],
    answer:
      'Email is fastest: **mohithgm@gmail.com**. Or DM on [LinkedIn](https://www.linkedin.com/in/mohithg) or [GitHub](https://github.com/mohithg).',
    citations: [{ label: 'Email Mohith', href: 'mailto:mohithgm@gmail.com' }],
  },
  {
    id: 'compensation',
    questions: ['What\'s his salary expectation?', 'Compensation', 'How much does he charge?', 'Rates'],
    keywords: ['salary', 'compensation', 'comp', 'rate', 'rates', 'pay', 'cost', 'expensive', 'cheap', 'budget', 'package', 'equity'],
    answer:
      'Best to discuss directly. He\'s open to a range that reflects 11 years of experience as a founding-engineer-caliber Product Engineer with strong AI specialization. Generally biased toward **founding-engineer offers with meaningful equity** at AI-forward seed/Series A teams over higher-cash-but-no-equity roles.',
    citations: [{ label: 'Talk to him', href: 'mailto:mohithgm@gmail.com' }],
  },
  {
    id: 'about',
    questions: ['Who are you?', 'Tell me about Mohith', 'Tell me about yourself', 'Quick intro'],
    keywords: ['who', 'about', 'intro', 'introduction', 'background', 'profile', 'overview', 'summary', 'biography', 'bio'],
    answer:
      'I\'m **Mohith G** — an AI Product Engineer with 11+ years building products at YC-backed startups. Currently the first engineer at **[PortfolioPilot](https://portfoliopilot.com)**, an AI financial advisor. Previously founding engineer at **[IntuitionAI](https://intuition.ai)** (acquired by Domino Data Lab), and shipped early Rippling and AthenaHealth. I ship the entire stack — design → DAGs → frontend → backend → DB → infra → AI. The full story is on [/about](/about), drawn as a DAG on the home page.',
    citations: [{ label: 'About', href: '/about' }],
  },
];
