import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../../lib/site';
import { pillarById } from '../../lib/writing';

export async function GET(context: APIContext) {
  const all = import.meta.glob<any>('./*.mdx', { eager: true });
  const items = Object.values(all)
    .map((mod) => mod.frontmatter as any)
    .filter((fm) => fm && fm.title)
    .sort((a, b) => (a.publishDate < b.publishDate ? 1 : -1))
    .map((fm) => ({
      title: fm.title,
      description: fm.description,
      pubDate: new Date(fm.publishDate),
      link: `/writing/${fm.slug}`,
      categories: [pillarById(fm.pillar).title],
    }));

  return rss({
    title: `${SITE.name} · Writing`,
    description:
      'Essays on AI product engineering, LLM evals, agents, prompts, and the napkin math of running models in production.',
    site: context.site ?? SITE.url,
    items,
    customData: `<language>en-us</language>`,
  });
}
