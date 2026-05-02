export type PressMoment = {
  year: number;
  title: string;
  description: string;
  href?: string;
  source?: string;
};

export const PRESS: readonly PressMoment[] = [
  {
    year: 2016,
    title: 'Dan Abramov tweet',
    description:
      'React\'s creator (and now Bluesky engineer) tweeted about a production React app I shipped at Codebrahma — back when shipping non-trivial React in production was still rare.',
    source: 'Twitter / X',
  },
  {
    year: 2018,
    title: 'IntuitionAI → Domino Data Lab acquisition',
    description:
      'The model-monitoring company I co-built as founding engineer was acquired by Domino Data Lab. Joined Domino\'s core platform team for the next three years.',
    href: 'https://dominodatalab.com',
    source: 'Domino Data Lab',
  },
  {
    year: 2023,
    title: 'Early ChatGPT plugins for PortfolioPilot',
    description:
      'Built one of the first wave of ChatGPT plugins — financial-advice retrieval over PortfolioPilot data. Migrated to GPTs as the platform evolved, then to a full agent stack.',
    href: 'https://portfoliopilot.com',
    source: 'PortfolioPilot',
  },
];
