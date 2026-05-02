export type CareerNode = {
  id: string;
  role: string;
  company: string;
  start: string;
  end: string | 'present';
  location?: string;
  summary: string;
  tags: readonly string[];
  href?: string;
  caseStudy?: string;
  flagship?: boolean;
};

export const CAREER: readonly CareerNode[] = [
  {
    id: 'globalpredictions',
    role: 'Founding / First Engineer',
    company: 'Global Predictions · PortfolioPilot',
    start: '2021-06',
    end: 'present',
    location: 'Remote',
    summary:
      'First engineer on the team. Built the AI financial advisor end-to-end — from the early ChatGPT-plugin era through GPTs through today\'s agent stack.',
    tags: ['AI', 'LLMs', 'Python', 'TypeScript', 'AWS', 'Eval', 'Real-time'],
    href: 'https://portfoliopilot.com',
    caseStudy: '/work/portfoliopilot',
    flagship: true,
  },
  {
    id: 'domino',
    role: 'Senior Software Engineer',
    company: 'Domino Data Lab',
    start: '2018-06',
    end: '2021-06',
    location: 'Remote',
    summary:
      'Joined post-acquisition. Worked on Domino\'s core platform, built real-time systems, and led an architecture revamp of significant parts of the codebase.',
    tags: ['Distributed systems', 'MLOps', 'Real-time', 'Scala', 'TypeScript', 'K8s'],
    href: 'https://dominodatalab.com',
    caseStudy: '/work/intuition-ai',
  },
  {
    id: 'intuition-ai',
    role: 'Founding Engineer',
    company: 'IntuitionAI',
    start: '2017-08',
    end: '2018-06',
    location: 'Bengaluru / Remote',
    summary:
      'Built model monitoring before "model monitoring" was a category. Drift, data quality, eval. Acquired by Domino Data Lab in 2018.',
    tags: ['ML monitoring', 'Founding', 'Acquisition', 'Python', 'Real-time'],
    href: 'https://intuition.ai',
    caseStudy: '/work/intuition-ai',
    flagship: true,
  },
  {
    id: 'navya',
    role: 'Full-stack Engineer',
    company: 'Navya.Care',
    start: '2016-09',
    end: '2017-08',
    location: 'Bengaluru',
    summary:
      'Cancer second-opinion platform connecting patients in India with oncologists at top US institutions. Shipped most of the patient and clinician surfaces.',
    tags: ['Healthcare', 'Full-stack', 'React', 'Node.js'],
    href: 'https://navyanetwork.com',
  },
  {
    id: 'rippling',
    role: 'React Engineer (via Codebrahma)',
    company: 'Rippling',
    start: '2016-02',
    end: '2016-09',
    location: 'San Francisco / Remote',
    summary:
      'Built early product surfaces for Rippling — Parker Conrad\'s next company after Zenefits. Worked through Codebrahma, the React shop where I shipped my first React app to production.',
    tags: ['React', 'YC', 'HRIS', 'Frontend craft'],
    href: 'https://rippling.com',
    caseStudy: '/work/rippling',
    flagship: true,
  },
  {
    id: 'codebrahma',
    role: 'React Engineer',
    company: 'Codebrahma',
    start: '2015-08',
    end: '2017-08',
    location: 'Bengaluru',
    summary:
      'React dev shop. Shipped my first React app to production and got a tweet from Dan Abramov. Worked across early-stage clients including Rippling.',
    tags: ['React', 'Open source'],
    href: 'https://codebrahma.com',
  },
  {
    id: 'athena',
    role: 'Software Engineer',
    company: 'AthenaHealth',
    start: '2014-07',
    end: '2015-08',
    location: 'Chennai',
    summary:
      'First job out of college. Healthcare software at scale — learned what real engineering rigor looks like.',
    tags: ['Healthcare', 'Java'],
  },
];

export const FLAGSHIPS = CAREER.filter((c) => c.flagship);

export type Edge = { from: string; to: string };

export const CAREER_EDGES: readonly Edge[] = [
  { from: 'athena', to: 'codebrahma' },
  { from: 'codebrahma', to: 'rippling' },
  { from: 'codebrahma', to: 'navya' },
  { from: 'rippling', to: 'navya' },
  { from: 'navya', to: 'intuition-ai' },
  { from: 'intuition-ai', to: 'domino' },
  { from: 'domino', to: 'globalpredictions' },
];
