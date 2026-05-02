// Build a 1200x630 OG image for the default site card.
// Renders an SVG (handwritten) and converts to PNG via sharp.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#0A0A0F"/>
      <stop offset="1" stop-color="#1A1A24"/>
    </linearGradient>
    <radialGradient id="violetGlow" cx="22%" cy="40%" r="35%">
      <stop offset="0" stop-color="#7C5CFF" stop-opacity="0.45"/>
      <stop offset="1" stop-color="#7C5CFF" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="mintGlow" cx="80%" cy="80%" r="35%">
      <stop offset="0" stop-color="#00E5A0" stop-opacity="0.4"/>
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
  <rect width="1200" height="630" fill="url(#violetGlow)"/>
  <rect width="1200" height="630" fill="url(#mintGlow)"/>

  <!-- Tiny DAG decoration top right -->
  <g transform="translate(820,80)" opacity="0.85">
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
  </g>

  <!-- Logo block -->
  <g transform="translate(80,80)">
    <rect x="0" y="0" width="64" height="64" rx="14" fill="#0A0A0F" stroke="#7C5CFF" stroke-opacity="0.5" stroke-width="1"/>
    <path d="M14 44 L14 26 Q14 22 18 22 Q22 22 22 26 L22 44 M22 28 Q22 22 26 22 Q30 22 30 28 L30 44" stroke="#F5F5F0" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M50 22 L50 46 Q50 52 44 52 Q38 52 38 47 M50 28 Q50 22 44 22 Q36 22 36 32 Q36 42 44 42 Q50 42 50 36 L50 28" stroke="#F5F5F0" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <text x="80" y="42" font-family="ui-sans-serif, sans-serif" font-size="22" font-weight="500" fill="#9B9B9B" letter-spacing="-0.5">mohith g</text>
  </g>

  <!-- Eyebrow -->
  <text x="80" y="220" font-family="ui-monospace, monospace" font-size="18" letter-spacing="6" fill="#9B9B9B">PRODUCT  ENGINEER  ·  AI  ·  11Y</text>

  <!-- Hero headline -->
  <text x="80" y="312" font-family="ui-sans-serif, sans-serif" font-size="74" font-weight="700" fill="#F5F5F0" letter-spacing="-2.5">I ship any product</text>
  <text x="80" y="395" font-family="ui-sans-serif, sans-serif" font-size="74" font-weight="700" letter-spacing="-2.5">
    <tspan fill="#9B9B9B">with </tspan>
    <tspan fill="#A088FF">AI</tspan>
    <tspan fill="#9B9B9B"> in every layer</tspan>
  </text>
  <text x="80" y="478" font-family="ui-sans-serif, sans-serif" font-size="74" font-weight="700" letter-spacing="-2.5">
    <tspan fill="#9B9B9B">from </tspan>
    <tspan font-family="ui-monospace, monospace" font-style="italic" fill="#00E5A0">DAGs</tspan>
    <tspan fill="#9B9B9B"> to </tspan>
    <tspan font-family="ui-monospace, monospace" font-style="italic" fill="#A088FF">UI</tspan>
    <tspan fill="#9B9B9B">.</tspan>
  </text>

  <!-- Bottom strip -->
  <line x1="80" y1="555" x2="1120" y2="555" stroke="#FFFFFF" stroke-opacity="0.08"/>
  <text x="80" y="595" font-family="ui-monospace, monospace" font-size="18" fill="#9B9B9B">First engineer · PortfolioPilot.com</text>
  <text x="1120" y="595" text-anchor="end" font-family="ui-monospace, monospace" font-size="18" fill="#9B9B9B">mohithg.com</text>
</svg>
`;

const outDir = resolve(root, 'public/og');
await mkdir(outDir, { recursive: true });
const out = resolve(outDir, 'default.png');
await sharp(Buffer.from(svg)).png({ quality: 92 }).toFile(out);
console.log(`Wrote ${out}`);
