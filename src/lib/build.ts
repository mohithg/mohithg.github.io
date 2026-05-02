import { Cpu, Database, Layers3, Workflow, Sparkles, Zap } from 'lucide-react';

export type BuildSurface = {
  id: string;
  title: string;
  iconName: 'sparkles' | 'workflow' | 'zap' | 'layers' | 'database' | 'cpu';
  blurb: string;
  examples: readonly string[];
};

export const BUILD_SURFACES: readonly BuildSurface[] = [
  {
    id: 'ai',
    title: 'AI features in production',
    iconName: 'sparkles',
    blurb:
      'Real LLM features that sit on real systems, not LLM wrappers around someone else\'s engine. Tool-using agents, streaming UIs, end-to-end coherence between substance and surface.',
    examples: [
      'PortfolioPilot AI translation layer over a hedge-fund-grade quant engine',
      'Early ChatGPT plugins → GPTs migration → custom agent runtime',
      'Streaming UIs over LLM tool calls, citing the source the engine ran on',
    ],
  },
  {
    id: 'realtime',
    title: 'Real-time systems',
    iconName: 'zap',
    blurb:
      'Sub-second feedback loops where they matter, from real-time model monitoring at Domino to live-streaming AI advice at PortfolioPilot.',
    examples: [
      'Model drift / data-quality monitoring at scale',
      'Streaming AI responses with optimistic UI',
      'WebSocket + SSE infra and the gnarly state-sync that comes with it',
    ],
  },
  {
    id: 'pipelines',
    title: 'Data pipelines & DAGs',
    iconName: 'workflow',
    blurb:
      'Daily ETL, financial-data ingestion, multi-vendor normalization. The unglamorous plumbing that the entire quant engine sits on.',
    examples: [
      'Multi-source financial data ingestion at PortfolioPilot, normalized into one canonical model',
      'Macro-signal pipelines feeding multi-model orchestration',
      'Celery, Airflow-style DAGs, idempotency, replay safety',
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend craft',
    iconName: 'layers',
    blurb:
      'React since the early days. First React-to-prod app earned a Dan Abramov tweet. Today: design systems, complex state, taste.',
    examples: [
      'PortfolioPilot product UI: design system + component library',
      'Earned a Dan Abramov tweet for production React work in 2016',
      'Server components, Suspense, modern patterns shipped to real users',
    ],
  },
  {
    id: 'backend',
    title: 'Backend & data',
    iconName: 'database',
    blurb:
      'Python + Node services, Postgres, schema migrations, the full lifecycle. Nothing gets thrown over a wall.',
    examples: [
      'Python services (FastAPI, Django) and Node services (Express, Hapi)',
      'Postgres schema design, partitioning, query plans',
      'Authn/authz, multi-tenancy, financial-data correctness',
    ],
  },
  {
    id: 'infra',
    title: 'Infra & scale',
    iconName: 'cpu',
    blurb:
      'AWS, Kubernetes, observability, cost. I can stand it up, scale it, and pay for it.',
    examples: [
      'K8s deployments, GitOps, blue/green',
      'Observability (traces, metrics, structured logs, end-to-end annotated outputs)',
      'Cost-aware architecture; choosing managed vs. self-hosted with eyes open',
    ],
  },
];

export const ICON_MAP = {
  sparkles: Sparkles,
  workflow: Workflow,
  zap: Zap,
  layers: Layers3,
  database: Database,
  cpu: Cpu,
} as const;
