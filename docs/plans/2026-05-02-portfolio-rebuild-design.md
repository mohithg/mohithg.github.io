# Portfolio Rebuild — Design Doc

**Status:** Approved
**Date:** 2026-05-02
**Owner:** Mohith G
**Domain:** mohithg.com

---

## 1. Goal

Rebuild `mohithg.com` from the 2017-era jQuery template into a portfolio that signals "AI Product Engineer, founding-engineer caliber" within 10 seconds and convinces a senior hiring manager to want a conversation.

### Success criteria

- A hiring manager can read the home page in 90 seconds and walk away with: *"this person ships entire AI products end-to-end."*
- A recruiter can ask "what did Mohith do at PortfolioPilot?" via the on-site chat and get a citable, accurate answer.
- Lighthouse: ≥ 95 on Performance, Accessibility, Best Practices, SEO (mobile + desktop).
- LCP < 1.8s, INP < 200ms, CLS < 0.05 on a 4G connection.
- Zero "templated" tells — visitors should feel a person built this with intent.

### Non-goals (YAGNI)

- A CMS. Content is MDX in-repo; commits are the publishing flow.
- An auth system, comments, or newsletter. Blog stays at `blog.mohithg.com`.
- A dark/light theme switcher in v1 — site is dark-first, considered as a creative choice.
- E-commerce, course sales, lead-gen forms beyond a single contact link.

---

## 2. Positioning

**Tagline (working):** *Product Engineer. Ships AI products end-to-end — from DAGs to UI.*

**Story arc the site must tell, in order:**

1. *I have shipped real AI products at scale, including some firsts (early ChatGPT plugins).*
2. *I've been a founding engineer before — and that startup got acquired.*
3. *I work across the entire stack — design, frontend, backend, data, infra, ML.*
4. *I have a 10+ year track record at companies you've heard of (Rippling, Domino, Athena).*
5. *Talk to me.*

**Audience:** Hiring managers / founders at AI-forward startups (seed → Series B) looking for founding or early senior engineers. Secondary: recruiters at top product companies.

---

## 3. Information Architecture

```
/                              # Home — single long page, scroll-driven
/work/portfoliopilot           # Flagship case study
/work/intuition-ai             # Flagship case study (incl. Domino chapter)
/work/rippling                 # Flagship case study
/about                         # Long-form bio, values, hobbies, photo
/uses                          # Tools, hardware, dotfiles (cheap SEO + culture-fit signal)
/now                           # nownownow.com convention — what I'm working on
/404                           # Custom playable game
api.mohithg.com/chat           # Cloudflare Worker — RAG chat endpoint
```

**Home page beats (top to bottom):**

1. **DAG hero** — full-viewport. Career rendered as a live, interactive Airflow-style DAG. Mouse-reactive WebGL particles in the background. Tagline + 2 CTAs ("See my work" → scroll, "Chat with me" → opens chat widget).
2. **One-paragraph identity** — third-person, tight, name + headline + 3 anchor proof points (linkified to case studies).
3. **Selected work** — 3 large flagship cards (PortfolioPilot, IntuitionAI, Rippling) with a 1-sentence tagline, a key metric, and a hero visual. Cards animate in on scroll. Click → case study page.
4. **The other chapters** — horizontal carousel / timeline of the supporting roles (AthenaHealth, Codebrahma, Navya, side projects). Each is a small card with a single beat ("Built India's first cancer second-opinion platform end-to-end").
5. **What I build** — replaces the old "What I do" feature grid. Reframed as **product surfaces I ship**: AI features in production / Real-time systems / Data pipelines / Frontend craft / Infra & scale. Each card opens an inline drawer with 1-2 specific examples, not a vague description.
6. **Press & moments** — Dan Abramov tweet, IntuitionAI acquisition, ChatGPT plugins launch. Social proof, 1 line each.
7. **Talk to me** — single CTA. Email link, calendar link, "Chat with my career" widget. No form.
8. **Footer** — minimal: logo, socials, "built with Astro on Cloudflare Pages, source on GitHub" (signals craft).

---

## 4. Visual System

### Palette

A considered dark palette. Three colors do all the work; the gradients carry the rest.

```
--ink:        #0A0A0F   /* near-black, base */
--ink-2:      #111118   /* card surface */
--ink-3:      #1A1A24   /* elevated */
--paper:      #F5F5F0   /* warm off-white text */
--paper-dim:  #9B9B9B   /* muted text */
--accent:     #7C5CFF   /* AI violet — primary action, DAG edges */
--accent-2:   #00E5A0   /* signal green — metric pops, success states */
--accent-3:   #FF5C8A   /* alert pink — used sparingly, hover */
--grid:       rgba(255,255,255,0.04)   /* hairline rules */
```

Gradients:

- **Hero mesh:** radial blend `--accent` → `--accent-2` over `--ink`, 30% opacity, blurred 200px, mouse-parallax.
- **Section dividers:** thin animated gradient line, `accent` → `accent-2`.
- **Hover glow:** soft conic gradient under interactive cards.

### Typography

Two faces, opinionated pairing:

- **Display (headings):** [Geist Sans](https://vercel.com/font) or [Inter Display] — modern geometric, tight tracking, weight 600/700.
  - Fallback: `system-ui, -apple-system, sans-serif`.
- **Mono (code, DAG labels, metrics, terminal):** [JetBrains Mono] or [Geist Mono] — weight 500.
- **Body:** Geist Sans 400, line-height 1.6, max-width 64ch.

Hierarchy:
- Hero H1: `clamp(3.5rem, 8vw, 7rem)`, weight 700, `-0.04em` tracking.
- Section H2: `clamp(2rem, 4vw, 3.5rem)`, weight 600.
- Body: `1.0625rem` desktop / `1rem` mobile.

### Motion

Principles, not a library of animations:

- **Purposeful only.** Motion clarifies — never decorates without reason.
- **Scroll-driven, not autoplay.** No looping idle animations except the hero mesh.
- **Respects `prefers-reduced-motion`** — DAG goes static, particles disappear, transitions ≤ 100ms.
- **Easings:** `cubic-bezier(0.16, 1, 0.3, 1)` (decelerate) for most enters; `cubic-bezier(0.65, 0, 0.35, 1)` for exits.
- **Durations:** 200ms (micro), 400ms (small), 700ms (large reveals). Nothing slower.

### Logo / monogram

Direction: a refinement of the existing lowercase **mg** ligature, redrawn as a custom letterform that doubles as a **DAG node**. Two variants:

1. **Mark:** the ligature inside a 1px-stroke rounded square with a single connector dot — reads as both a monogram and a node-in-a-graph. Used in nav, footer, favicon, OG card.
2. **Wordmark:** "mohith g" in Geist Mono lowercase, 500 weight, with the mark on the left. Used in the open-graph image and resume.

The mark must work at 16px (favicon), 64px (nav), and 512px (OG). I'll author it as an SVG in `src/assets/logo.svg` and the favicon set is generated from that one source.

---

## 5. The Hero — Career DAG (signature interaction #1)

**The single most important moment on the site.** Visitors land here. It must be unmistakably distinctive within 2 seconds.

### Concept

The viewport renders a directed acyclic graph of Mohith's career. Each node is a role; edges show the path through time. The DAG is **alive**:

- Particles drift along edges in the direction of time.
- Nodes pulse softly at a slow heart-rate (3s loop).
- The cursor casts a parallax field — particles bend toward / away from it.
- On hover of a node: edge connections to related nodes light up; a small popover slides out with role + dates + 1-line headline.
- Click a node → smooth-scroll to the corresponding section on the home page (or navigate to the flagship case study page if it has one).

### Layout (initial state)

```
   AthenaHealth ─┐
                 ▼
          Codebrahma ─── Rippling
                 │            │
                 ▼            ▼
              Navya ──── IntuitionAI ──► Domino
                              │             │
                              └─────┬───────┘
                                    ▼
                            Global Predictions
                              (PortfolioPilot)
                                    │
                                    ▼
                                  [now]
```

Layout uses [d3-dag](https://github.com/erikbrinkman/d3-dag) for deterministic positioning. Final coordinates baked at build time so first paint is instant.

### Tech

- **Astro Island** mounting a tiny React component using **react-three-fiber + drei** for the WebGL particle background, and **plain SVG** for the DAG itself (better a11y, easier styling, lighter than canvas for graph elements).
- Total JS budget for hero: **< 60 KB gzipped** (R3F is ~40 KB; SVG is free; d3-dag tree-shaken).
- Falls back to a static SVG snapshot for `prefers-reduced-motion` and for users without WebGL.
- The static snapshot is also what gets used in the **OG image** — same DAG, baked PNG.

### A11y

- Every node is a `<button>` with `aria-label="Role at Company, 2018-2020"`.
- Tab order follows time order.
- The whole DAG has `role="group" aria-label="Career timeline as a directed acyclic graph"`.
- Decorative particles are `aria-hidden`.

---

## 6. Flagship Case Study Template

**Each case study is a story, not a CV bullet list.** Same template across all three flagships so they cohere.

### Sections

1. **Hero** — Project name, 1-line tagline, 3 metric chips (e.g. "First engineer", "$X scale", "AI features in prod"). Background: project-specific gradient or screenshot.
2. **The setup** — 2-3 paragraphs. What was the company, what did they hire me to do, what state was the codebase / product in when I joined.
3. **What I owned** — bulleted list of surfaces I personally shipped. Use the past tense and verbs ("Built", "Designed", "Migrated", "Owned").
4. **Architecture explorer** (signature interaction #3) — interactive system diagram. Hover a service → tooltip with "I built this" / "Existed; I refactored". Click → drilldown with technical detail (1 paragraph). Built as an SVG with hotspots.
5. **A hard problem, solved** — pick ONE technical story per case study. Set up the constraint, walk through the trade-offs, show the resolution. ~400 words. This is the section that proves seniority.
6. **What I learned / would do differently** — short. Signals reflective practice without being self-flagellating.
7. **Outcome** — what changed in the world because the work shipped. Metrics if quotable, otherwise narrative ("acquired by Domino", "still in production at scale 4 years later").
8. **Next** — link to the next flagship + back to home.

### Story picks per flagship

- **PortfolioPilot:** Hard problem = building the AI advisor's eval & guardrail system so financial advice is correct enough to ship.
- **IntuitionAI → Domino:** Hard problem = real-time model monitoring at scale; how the system survived integration into Domino's platform.
- **Rippling:** Hard problem = the React frontend craft moment that earned the Dan Abramov tweet — what specifically was novel about it for that era of React.

---

## 7. Chat with My Career (signature interaction #2)

A floating chat widget on every page. Anyone can ask about Mohith's experience and get a real, accurate, citation-linked answer.

### UX

- **Trigger:** floating button bottom-right (`mg`-mark in a circle), and `⌘ /` keyboard shortcut. The home hero CTA "Chat with me" also opens it.
- **First impression:** opens with a curated set of suggested questions:
  - *"What did Mohith ship at PortfolioPilot?"*
  - *"How did the IntuitionAI acquisition happen?"*
  - *"What's his strongest stack — frontend, backend, or AI?"*
  - *"Why should I hire him?"*
- **Streaming response.** Citations appear inline as small numbered chips that link to the relevant case-study section.
- **Rate limited** to 10 messages per session per IP, 30/day per IP. Visible counter when remaining < 3.
- **Transcript copy button.** Recruiters can paste the convo into their notes.

### Architecture

```
Browser ── POST /chat ──► Cloudflare Worker ──► Anthropic API (Claude Haiku 4.5)
                                  │
                                  └──► KV: pre-built embeddings + chunk index
```

- **Corpus:** all MDX content from `/src/content/work/*` + a small `bio.md` written specifically for the bot. ~30-50 chunks total. Small enough that we can pass the *entire corpus* in the system prompt with prompt caching, skipping vector search complexity. (Re-evaluate if corpus grows past ~30k tokens.)
- **Model:** Claude Haiku 4.5 — fast, cheap, plenty good for Q&A over 30 chunks.
- **Prompt caching** on the system prompt (5-min TTL is plenty for normal traffic; cache hits should dominate cost).
- **Citations:** the system prompt instructs the model to wrap referenced facts in `[#chunk-id]` markers; the frontend renders these as link chips that scroll the relevant case study into view.
- **Cost ceiling:** alert when monthly Anthropic spend > $25. Cap budget at $50/mo via Cloudflare Worker logic that disables the endpoint if a counter in KV is exceeded.

### Failure modes

- Worker timeout / Anthropic 5xx → graceful fallback message: *"Chat is having a moment — email me at mohithgm@gmail.com or grab my résumé."*
- Rate limit hit → friendly explainer with the email/résumé fallback.
- LLM hallucinates a fact → mitigated by strict system prompt: *"If the answer is not in the provided context, say you don't know and offer to email Mohith."* Plus visible citations.

---

## 8. Polish & Easter Eggs

Cheap, high-delight. Each one is a "wait, that's cool" moment without being a gimmick.

- **⌘K command palette** — primary nav. Type to filter; jump to any page or section. Includes "Open chat", "Download résumé", "Copy email", "View source".
- **Konami code** (`↑↑↓↓←→←→ba`) → terminal mode. The whole site flips to a black-and-green terminal. Type `ls`, `cat about.md`, `cat work/portfoliopilot.md`, `whoami`, `history`, `exit`. Easter egg credit: `cat secrets.txt` returns a haiku.
- **Custom 404** — a tiny playable Snake clone where the snake eats your CV bullets. Win condition: "all bullets eaten — refresh to send résumé to Mohith."
- **Page transitions** — Astro View Transitions API for soft cross-fades between work pages.
- **Cursor:** subtle gradient blob that follows the cursor on interactive surfaces only. Default arrow elsewhere.
- **OG image** — generated per page at build via `@vercel/og` adapted for Astro. Each case study gets its own.
- **`/uses` and `/now` pages** — short, real, signals culture-fit. Cheap SEO.

---

## 9. SEO Plan

Goal: rank for `mohith g`, `mohith global predictions`, `mohith portfoliopilot`, `intuitionai`, `mohith engineer`, plus long-tail queries on case-study titles.

### On-page

- **One H1 per page.** Home H1: "Mohith G — Product Engineer for AI products."
- **Meta titles** patterned: `${page} — Mohith G` (≤ 60 chars).
- **Meta descriptions** hand-written per page, 150-160 chars, with a verb and an outcome.
- **Per-page OG images** generated at build. 1200×630, with title + headline metric + DAG mark.
- **Structured data:**
  - `Person` schema on home (name, jobTitle, sameAs links to LinkedIn/GitHub/Codepen/blog).
  - `BreadcrumbList` on case studies.
  - `Article` schema on case studies (with `datePublished` and `author`).
- **Sitemap.xml + robots.txt** auto-generated by Astro.
- **Canonical URLs** on every page. `mohithg.com` as canonical (no `www`).
- **404** is custom and indexable (just lighthearted).
- **Internal linking:** every flagship case study links to the next two; home links to all three. Dense graph.

### Technical SEO

- HTML pre-rendered (Astro is SSG). No client-side routing for content.
- Images: AVIF + WebP via Astro `<Image>`, lazy below fold, eager for hero.
- Fonts: self-host woff2, `font-display: swap`, preload the two used in hero.
- Lighthouse green across the board is the contract.
- `lang="en"` on html. Proper headings, alt text, label associations.
- 301 from `www.mohithg.com` → `mohithg.com`.

### Off-page (handled outside this codebase)

- Update LinkedIn, GitHub, Codepen, Twitter/X bio with the new URL.
- Submit sitemap to Google Search Console + Bing Webmaster.
- Backlink the blog and any old projects to the new site.

---

## 10. Analytics

**Cloudflare Web Analytics** (privacy-first, no cookies, no consent banner needed in most jurisdictions, free with CF Pages). It gives traffic, top referrers, top pages — enough for a personal site.

**Custom events** sent via fetch to a CF Worker endpoint:
- `chat_opened` — chat widget opened.
- `chat_message_sent` — with anonymized topic classification (the worker can label it on the way through).
- `cta_clicked` — which CTA, which page.
- `case_study_completed` — fired when scroll depth ≥ 90% on a case study page.
- `resume_downloaded`.
- `easter_egg_unlocked` — terminal mode, snake game.

Events stored in CF D1 or a small KV; surfaced in a private `/admin/stats` page protected by Cloudflare Access (your email).

**No Google Analytics.** GA's value isn't worth the cookie banner and load cost on a site this size.

---

## 11. Performance Budget & Accessibility

### Performance budget

| Metric | Budget |
|---|---|
| Initial HTML (home) | ≤ 25 KB transferred |
| JS on home (gzipped) | ≤ 80 KB total, of which ≤ 60 KB is the DAG hero island |
| CSS (gzipped) | ≤ 15 KB |
| Hero image / WebGL textures | ≤ 100 KB |
| Time to first byte (CF edge) | ≤ 100 ms |
| LCP (4G) | ≤ 1.8 s |
| INP | ≤ 200 ms |
| CLS | ≤ 0.05 |

Enforced in CI via `lighthouse-ci` on every PR.

### Accessibility

- WCAG 2.2 AA.
- Color contrast ≥ 4.5:1 for body text against `--ink`. Test the violet/green accents on dark; adjust if needed.
- Focus rings visible and styled (not removed).
- Skip-to-content link.
- All interactives keyboard-reachable; ⌘K palette is the keyboard fast-path.
- `prefers-reduced-motion` — DAG static, no parallax, transitions ≤ 100ms.
- `prefers-color-scheme: light` is **not** honored in v1 (intentional: the site is a dark-first creative choice). Documented in `/uses` to avoid being an accessibility regression — the dark palette meets contrast standards.

---

## 12. Tech Stack & Deployment

### Stack

- **Astro 5** (or whatever's current at build time) — content-first SSG.
- **MDX** for case studies and bio.
- **TypeScript** strict.
- **Tailwind CSS** with a small custom theme matching the palette.
- **React 19** as the only Island framework (DAG hero, chat, command palette).
- **react-three-fiber + drei** for the hero WebGL background.
- **d3-dag** for graph layout (build-time only).
- **lucide-react** for icons.
- **shiki** for code blocks in case studies.

### Deployment

- **Cloudflare Pages** for static site (apex `mohithg.com`).
- **Cloudflare Worker** at `api.mohithg.com` for the `/chat` endpoint.
- **Cloudflare Web Analytics** for traffic.
- **DNS:** point existing `mohithg.com` records from GitHub Pages to Cloudflare. Keep `blog.mohithg.com` CNAME unchanged.
- **CI/CD:** GitHub Actions on push to `master` → build Astro → deploy Pages. Worker deploys via `wrangler` on changes inside `worker/`.
- **Preview deploys** automatically on every PR (CF Pages does this by default).

### Repo layout

```
/
├── src/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── uses.astro
│   │   ├── now.astro
│   │   ├── 404.astro
│   │   └── work/
│   │       ├── portfoliopilot.mdx
│   │       ├── intuition-ai.mdx
│   │       └── rippling.mdx
│   ├── components/
│   │   ├── DagHero/
│   │   ├── Chat/
│   │   ├── CommandPalette/
│   │   ├── ArchitectureExplorer/
│   │   ├── TerminalMode/
│   │   └── … atoms
│   ├── content/                  # if we use Astro Content Collections
│   ├── layouts/
│   ├── lib/                      # data: career nodes, projects, metrics
│   ├── styles/
│   └── assets/                   # logo.svg, headshot.jpg, screenshots/
├── worker/
│   ├── src/index.ts              # /chat handler
│   ├── corpus/                   # built MDX → chunked text for the bot
│   └── wrangler.toml
├── public/                       # static passthrough (favicon, robots, sitemap.xml)
├── docs/
│   └── plans/
├── astro.config.mjs
├── tailwind.config.ts
├── package.json
└── README.md
```

The legacy site files (`assets/`, `images/`, `index.html`) will be removed on the cutover commit. The old favicon stays as a fallback until the new monogram is generated.

---

## 13. Content Checklist (what gets written, by whom)

I'll draft all copy from public sources + the conversation context, then Mohith reviews/edits. Slots flagged `[VERIFY]` are facts I'll write conservatively but Mohith should confirm.

- [ ] **Home — identity paragraph** (60-80 words)
- [ ] **PortfolioPilot case study** (~1,200 words + architecture diagram + 1 hard-problem story)
- [ ] **IntuitionAI → Domino case study** (~1,200 words + diagram + story)
- [ ] **Rippling case study** (~1,000 words + diagram + Dan Abramov story)
- [ ] **About page** (~500 words + photo + values)
- [ ] **Uses page** — tools, hardware, dotfiles
- [ ] **Now page** — what's currently consuming attention (one paragraph, dated)
- [ ] **Bio prompt for the chat bot** (250 words, third person, factual)
- [ ] **Career nodes data** — `src/lib/career.ts` — array of `{role, company, start, end, location, summary, tags, hrefHomeAnchor, hrefCaseStudy?}`
- [ ] **Press moments data** — `src/lib/press.ts`
- [ ] **Headshot** — already supplied (`/home/mohithg/Downloads/DSC_0284.jpg`); will be color-corrected to fit palette and used on `/about` and OG.
- [ ] **Logo SVG** — I author from scratch using existing `mg.png` as DNA reference.

---

## 14. Implementation Phases

We ship in slices. Each phase ends with a deployable, demonstrably-better-than-before site.

### Phase 0 — Bootstrap (half day)
Astro project skeleton, Tailwind, theme tokens, base layout, deploy to Cloudflare Pages on a preview URL. Leave the existing site at `mohithg.com` untouched.

### Phase 1 — Static home + case study skeletons (1-2 days)
Real copy in MDX, real layout, real fonts, no DAG yet (placeholder hero), no chat yet. Looks great, ships great. Could be cut over to `mohithg.com` at the end of this phase as a low-risk MVP.

### Phase 2 — DAG hero (1 day)
Career-as-DAG SVG with R3F particle background. Mouse-reactive. Static fallback. Good a11y.

### Phase 3 — Cutover (half day)
Move `mohithg.com` DNS to Cloudflare Pages. Set up redirect from old GH Pages just in case.

### Phase 4 — Chat with my career (1 day)
Build worker, deploy, wire frontend widget. Soft-launch with the system prompt locked down.

### Phase 5 — Polish (1 day)
⌘K command palette, terminal mode, Snake 404, OG image generator, view transitions.

### Phase 6 — SEO + analytics (half day)
Structured data, sitemap, robots, OG, custom events, CF analytics, GSC submission.

**Total estimate:** ~6-7 productive days end-to-end. Phase 1 alone is already a massive upgrade and is the safe rollback point.

---

## 15. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| WebGL hero feels gimmicky on weaker devices | Static SVG fallback + `prefers-reduced-motion` + perf budget enforced |
| Chat bot hallucinates and embarrasses Mohith | Strict system prompt, citations, "I don't know" fallback, manual corpus curation |
| Anthropic costs spike on viral traffic | Per-IP rate limit + global $50/mo cap enforced in worker |
| DNS cutover breaks blog subdomain | Test in preview; keep `blog.mohithg.com` CNAME intact; document rollback |
| Case study claims overstate the work | All copy in PR; Mohith reviews each `[VERIFY]` flag before merge |
| Old GitHub Pages URL is indexed; SEO regression | 301 redirect old paths (none exist except `/`); update sitemap + GSC |

---

## 16. Open questions (none blocking)

1. Final pick for the hero font — Geist Sans vs. Inter Display. Decide at Phase 1 by testing both with the H1.
2. Should the chat widget remember a session locally (so a recruiter can come back and continue)? Default no for v1; reconsider after launch.
3. Do we want a tiny "press kit" page (`/press`) with logos and headshot for journalists/recruiters? Cheap to add. Defer to post-launch.
