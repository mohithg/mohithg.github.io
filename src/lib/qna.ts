// Curated Q&A corpus used by the "Chat with my career" widget.
// Answers are written in **first person** — when a visitor opens the chat,
// they're effectively talking to me. The bot greets as a bot but the
// answers themselves are mine.

export type QnA = {
  id: string;
  questions: readonly string[];
  keywords: readonly string[];
  answer: string; // markdown-lite: bold, italics, links
  citations?: readonly { label: string; href: string }[];
};

export const SUGGESTED_QUESTIONS = [
  'What did you ship at PortfolioPilot?',
  'Tell me about the IntuitionAI acquisition.',
  'What\'s your strongest stack — frontend, backend, or AI?',
  'Why should I hire you as a founding engineer?',
  'What\'s the Dan Abramov tweet story?',
  'How do you think about AI evals?',
] as const;

export const QNA: readonly QnA[] = [
  {
    id: 'pp-overview',
    questions: [
      'What did you ship at PortfolioPilot?',
      'What do you do at PortfolioPilot?',
      'Global Predictions work',
      'Tell me about PortfolioPilot',
    ],
    keywords: ['portfoliopilot', 'pilot', 'global', 'predictions', 'financial', 'advisor', 'first', 'engineer', 'ai', 'currently', 'today', 'now', 'job', 'role', 'sec'],
    answer:
      'I\'m the **first engineer** at PortfolioPilot (Global Predictions), since June 2021. PortfolioPilot is an **SEC-registered AI financial advisor** — a real fiduciary, not a chatbot pretending. I bootstrapped the codebase, built the financial-data ingestion DAGs, the recommendation engine, and the AI advisor stack — including one of the **first wave of ChatGPT plugins** in 2023, the GPTs migration, and the custom agent runtime we run today. I own the **eval & guardrail layer** that catches bad financial advice before it ships.',
    citations: [{ label: 'PortfolioPilot case study', href: '/work/portfoliopilot' }],
  },
  {
    id: 'evals',
    questions: [
      'How do you think about AI evals?',
      'What\'s your eval philosophy?',
      'evaluation systems',
      'guardrails for AI',
    ],
    keywords: ['eval', 'evals', 'evaluation', 'guardrail', 'guardrails', 'rubric', 'judge', 'shadow', 'production', 'rag', 'safety', 'correctness', 'hallucination', 'hallucinations'],
    answer:
      '"**Evals before features** in any AI product." Every team I\'ve watched ship LLM features has had the same six-month epiphany — they should have built the eval bench *first*. At PortfolioPilot the eval system runs in three modes: **continuous** (every PR), **deep** (every prompt or model change, with an LLM judge plus human spot-checks), and **production shadow** (against anonymized real traffic). The hard part isn\'t the framework — it\'s the **rubric**, which I discover by reading every transcript where the AI was wrong and distilling failure modes into rules.',
    citations: [{ label: 'See: PortfolioPilot — A hard problem, solved', href: '/work/portfoliopilot' }],
  },
  {
    id: 'intuition-ai',
    questions: [
      'Tell me about the IntuitionAI acquisition.',
      'How did the IntuitionAI/Domino story go?',
      'Founding engineer story',
    ],
    keywords: ['intuition', 'intuitionai', 'acquisition', 'acquired', 'exit', 'domino', 'datalab', 'data', 'founding', 'monitoring', 'drift', 'mlops', 'ml', 'kafka'],
    answer:
      'I was the **founding engineer at [IntuitionAI](https://intuition.ai)** in 2017 — building model monitoring (drift, data-quality, prediction logging) before model monitoring was a category. We shipped a complete system on **Kafka, Python, and React**. The company was acquired by **Domino Data Lab in 2018**. I stayed at Domino for **three years**, working on their core platform (**Scala backend, React frontend**): real-time systems, customer-facing on-call, and an architecture revamp of significant portions of the codebase using a strangler-fig pattern.',
    citations: [{ label: 'IntuitionAI → Domino case study', href: '/work/intuition-ai' }],
  },
  {
    id: 'rippling',
    questions: [
      'What did you do at Rippling?',
      'Rippling work history',
      'YC startup experience',
    ],
    keywords: ['rippling', 'parker', 'conrad', 'codebrahma', 'react', '2016', 'yc', 'hr', 'hris', 'zenefits'],
    answer:
      'In early 2016, through Codebrahma, I built early product surfaces for **Rippling** — Parker Conrad\'s next company after Zenefits, now valued at $13B+. Seven months shipping complex React UI when "production React" was still a sentence that needed a footnote. The work earned a **tweet from Dan Abramov** about the production React coming out of Codebrahma at the time, when senior React tweets were the closest thing the ecosystem had to peer review.',
    citations: [{ label: 'Rippling case study', href: '/work/rippling' }],
  },
  {
    id: 'dan-abramov',
    questions: [
      'What\'s the Dan Abramov tweet story?',
      'Tell me about the React tweet',
    ],
    keywords: ['dan', 'abramov', 'tweet', 'tweeted', 'twitter', 'recognition', 'famous'],
    answer:
      'In 2016, **Dan Abramov** (creator of React, Redux) tweeted about the production React work coming out of **Codebrahma** during the period I was there shipping Rippling. Production React was rare in 2016 — patterns weren\'t settled, hooks were three years away, Redux was a few months old. Anyone shipping non-trivial React was learning by writing. The Codebrahma work got attention because we picked the right patterns and committed to them.',
    citations: [{ label: 'See: Rippling case study', href: '/work/rippling' }],
  },
  {
    id: 'stack',
    questions: [
      'What\'s your strongest stack — frontend, backend, or AI?',
      'What\'s your best layer?',
      'specialty',
      'What do you specialize in',
    ],
    keywords: ['frontend', 'backend', 'fullstack', 'full-stack', 'stack', 'specialty', 'strongest', 'best', 'product', 'engineer', 'specialize', 'specialization', 'role'],
    answer:
      'I\'m a **Product Engineer**, not a specialist — the question I\'m solving is always *"what does the product need next?"* not *"which layer am I in?"* I\'ve shipped at every layer: design → DAGs → frontend (React since 2015) → backend (Python, Node) → DB (Postgres) → infra (K8s, AWS) → AI (LLM agents, evals, RAG). My strongest signal is **judgment under ambiguity** — picking what to build, in what order, with which trade-offs, on a small team where there\'s no one to defer to.',
  },
  {
    id: 'languages',
    questions: [
      'What programming languages do you use?',
      'What languages do you know?',
      'Tech stack',
      'What technologies',
    ],
    keywords: ['language', 'languages', 'programming', 'python', 'typescript', 'javascript', 'react', 'node', 'sql', 'postgres', 'perl', 'scala', 'kafka', 'lambda', 'tech', 'technology', 'technologies', 'framework', 'frameworks'],
    answer:
      'Daily: **Python** (FastAPI, Django, Celery), **TypeScript / React** (since 2015 — first React-to-prod earned a Dan Abramov tweet), **SQL** (mostly Postgres). Infra: **AWS, Kubernetes, Docker, Cloudflare**. AI: **Claude, OpenAI, pgvector, custom eval bench**. Across my career I\'ve also shipped **Perl** (AthenaHealth), **AWS Lambda** (Navya, when Lambda was brand new), **Kafka + Python + React** (IntuitionAI), and **Scala + React** (Domino). Full list on [/uses](/uses).',
    citations: [{ label: '/uses', href: '/uses' }],
  },
  {
    id: 'ai-products',
    questions: [
      'What AI products have you shipped?',
      'What kind of AI work have you done?',
      'LLM experience',
      'agent experience',
    ],
    keywords: ['ai', 'llm', 'gpt', 'plugin', 'plugins', 'agent', 'agents', 'rag', 'retrieval', 'chatgpt', 'openai', 'claude', 'anthropic', 'model', 'models', 'prompt', 'prompts'],
    answer:
      'At PortfolioPilot: I built one of the **first ChatGPT plugins** (financial Q&A over portfolio data, early 2023), then the **GPTs migration**, then the **custom agent runtime** we run today (tool-calling, streaming UI, evals). Plus the in-product daily AI advisor and the recommendation engine. At IntuitionAI: model monitoring as a product — drift, data quality, prediction logging — productized for enterprise ML teams.',
    citations: [{ label: 'PortfolioPilot case study', href: '/work/portfoliopilot' }],
  },
  {
    id: 'react',
    questions: [
      'Tell me about your React work',
      'Frontend experience',
      'How long have you done React?',
    ],
    keywords: ['react', 'frontend', 'ui', 'jsx', 'hooks', 'redux', 'next', 'nextjs', 'remix', 'astro', 'design', 'system', 'component', 'components'],
    answer:
      '**React since 2015** — one of the early production-React engineers in India. I shipped my first React app to production at **Codebrahma**, which earned a **Dan Abramov tweet** in 2016. I built early product surfaces at **Rippling** (now $13B+) and the entire **PortfolioPilot** product UI as the first engineer there. Comfortable across the modern frontend stack: hooks, server components, Suspense, Tailwind, Astro Islands.',
    citations: [{ label: 'Rippling case study', href: '/work/rippling' }],
  },
  {
    id: 'infra',
    questions: [
      'Do you do DevOps?',
      'Infra and Kubernetes experience',
      'Can you scale things?',
    ],
    keywords: ['devops', 'infra', 'infrastructure', 'kubernetes', 'k8s', 'aws', 'cloud', 'docker', 'scale', 'scaling', 'deploy', 'deployment', 'observability', 'cost', 'sre'],
    answer:
      'Yes. AWS / GCP, **Kubernetes** in production, Docker, Postgres operations, observability (traces, metrics, structured logs), cost-aware architecture. I\'ve stood up greenfield infra (PortfolioPilot, IntuitionAI), inherited and revamped existing infra (Domino), and shipped real-time systems where latency matters. I prefer managed services unless there\'s a strong reason not to.',
  },
  {
    id: 'opensource',
    questions: [
      'Open source contributions',
      'GitHub work',
      'have you contributed to OSS?',
    ],
    keywords: ['open', 'source', 'oss', 'github', 'npm', 'contribute', 'contribution', 'contributions', 'maintainer'],
    answer:
      'Contributions across the **npm ecosystem**, including [handsontable](http://handsontable.com) and a number of smaller libraries published as part of the React era at Codebrahma. My GitHub is at [github.com/mohithg](https://github.com/mohithg). Codepen at [codepen.io/mohithg](https://codepen.io/mohithg).',
    citations: [{ label: 'GitHub', href: 'https://github.com/mohithg' }],
  },
  {
    id: 'hire',
    questions: [
      'Why should I hire you as a founding engineer?',
      'Why hire you?',
      'What makes you a good fit?',
      'Should I hire you?',
    ],
    keywords: ['hire', 'hiring', 'founding', 'fit', 'good', 'available', 'open', 'looking', 'recruit', 'job', 'position', 'opportunity'],
    answer:
      'Three signals worth weighting: **(1)** I\'ve done it before — founding engineer at IntuitionAI through acquisition, first engineer at PortfolioPilot for five years and counting. **(2)** I ship AI in production, not demos — the eval layer I built at PortfolioPilot is what separates AI features that survive from ones that get rolled back. **(3)** I span the entire stack with judgment, which is what early-stage teams actually need. I\'m open to **founding-engineer or first-AI-engineer roles at AI-forward seed-to-Series-A teams**.',
    citations: [
      { label: 'Reach out', href: 'mailto:mohithgm@gmail.com' },
      { label: 'About', href: '/about' },
    ],
  },
  {
    id: 'years',
    questions: [
      'How many years of experience do you have?',
      'How long have you been doing this?',
      'How experienced are you?',
    ],
    keywords: ['year', 'years', 'experience', 'experienced', 'long', 'old', 'seniority', 'senior', 'junior'],
    answer:
      '**11+ years** of professional engineering, since 2014. Started at **AthenaHealth** (Perl), then **Codebrahma** (where I shipped my first production React app and got the Dan Abramov tweet), then **Rippling** via Codebrahma, then **Navya** (AWS Lambda, when Lambda was new), then founding engineer at **IntuitionAI** (Kafka + Python + React, acquired by Domino), three years at **Domino** (Scala + React), then first engineer at **PortfolioPilot** from June 2021.',
  },
  {
    id: 'education',
    questions: [
      'Where did you study?',
      'What\'s your education?',
      'Degree?',
      'Did you go to college?',
    ],
    keywords: ['education', 'study', 'studied', 'degree', 'university', 'college', 'school', 'gold', 'medalist', 'topper', 'student', 'graduate', 'cs', 'computer', 'science'],
    answer:
      'Computer Science, **gold medalist** and **batch topper** at **[Saveetha Engineering College](https://saveetha.ac.in)**, affiliated with **Anna University**.',
  },
  {
    id: 'location',
    questions: [
      'Where do you live?',
      'Where are you based?',
      'Remote?',
      'Timezone',
    ],
    keywords: ['location', 'live', 'lives', 'based', 'where', 'remote', 'bengaluru', 'bangalore', 'india', 'timezone', 'tz', 'travel', 'relocate'],
    answer:
      '**Bengaluru, India**. I\'ve worked remotely with US-based teams since 2018 (Domino, Global Predictions). Comfortable with overlap hours, SF hours when needed.',
  },
  {
    id: 'contact',
    questions: [
      'How do I reach you?',
      'Contact info',
      'How to get in touch',
      'Email',
    ],
    keywords: ['contact', 'reach', 'email', 'message', 'touch', 'linkedin', 'dm', 'phone', 'call'],
    answer:
      'Email is fastest: **mohithgm@gmail.com**. Or DM on [LinkedIn](https://www.linkedin.com/in/mohithg) or [GitHub](https://github.com/mohithg).',
    citations: [{ label: 'Email me', href: 'mailto:mohithgm@gmail.com' }],
  },
  {
    id: 'compensation',
    questions: [
      'What\'s your salary expectation?',
      'Compensation',
      'How much do you charge?',
      'Rates',
    ],
    keywords: ['salary', 'compensation', 'comp', 'rate', 'rates', 'pay', 'cost', 'expensive', 'cheap', 'budget', 'package', 'equity'],
    answer:
      'Best to discuss directly. I\'m open to a range that reflects 11 years of experience as a founding-engineer-caliber Product Engineer with strong AI specialization. Generally biased toward **founding-engineer offers with meaningful equity** at AI-forward seed/Series A teams over higher-cash-but-no-equity roles.',
    citations: [{ label: 'Talk to me', href: 'mailto:mohithgm@gmail.com' }],
  },
  {
    id: 'about',
    questions: [
      'Who are you?',
      'Tell me about yourself',
      'Quick intro',
    ],
    keywords: ['who', 'about', 'intro', 'introduction', 'background', 'profile', 'overview', 'summary', 'biography', 'bio'],
    answer:
      'I\'m **Mohith G** — a Product Engineer with 11+ years building products at YC-backed startups. Currently the first engineer at **[PortfolioPilot](https://portfoliopilot.com)** (an SEC-registered AI financial advisor). Previously founding engineer at **[IntuitionAI](https://intuition.ai)** (acquired by Domino Data Lab), and shipped early at Rippling and AthenaHealth. I ship the entire stack — design → DAGs → frontend → backend → DB → infra → AI. The full story is on [/about](/about), drawn as a DAG on the home page.',
    citations: [{ label: 'About', href: '/about' }],
  },
];
