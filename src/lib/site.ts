export const SITE = {
  name: 'Mohith G',
  shortName: 'mohith g',
  domain: 'mohithg.com',
  url: 'https://mohithg.com',
  email: 'mohithgm@gmail.com',
  blog: 'https://blog.mohithg.com',
  /** Set to true once blog.mohithg.com is live again. Toggling this on
   *  re-enables every blog reference across the site (Footer, Contact,
   *  About, CommandPalette, Person JSON-LD sameAs). */
  blogEnabled: false,
  github: 'https://github.com/mohithg',
  linkedin: 'https://www.linkedin.com/in/mohithg',
  codepen: 'https://codepen.io/mohithg',
  twitter: 'https://twitter.com/mohithgm',
  twitterHandle: '@mohithgm',
  location: 'Bengaluru, India',
  timezone: 'Asia/Kolkata',
  tagline: 'Product Engineer · ships any product, with AI in every layer',
  longTagline: 'I ship any product, with AI in every layer, from DAGs to UI.',
  description:
    'Mohith G is a Product Engineer with 11+ years building products at YC-backed startups. Today he is the first engineer at PortfolioPilot (SEC-registered AI financial advisor), where he built the hedge-fund-grade quant engine ground-up and the AI surface that makes it legible. Previously founding engineer at IntuitionAI (acquired by Domino Data Lab), and shipped early at Navya, Rippling, AthenaHealth.',
  ogImage: '/og/default.png',
} as const;

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/#work', label: 'Work' },
  { href: '/writing', label: 'Writing' },
  { href: '/about', label: 'About' },
  { href: '/uses', label: 'Uses' },
  { href: '/now', label: 'Now' },
] as const;
