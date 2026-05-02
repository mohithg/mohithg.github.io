// Lightweight motion system: scroll-reveal + count-up + cursor glow + magnetic CTAs.
// Re-runs on every astro:page-load so it works across view transitions.
export {};

declare global {
  interface Window {
    __mgAnimsInited?: boolean;
  }
}

const REDUCED = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function reveal() {
  if (REDUCED()) {
    document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => el.classList.add('is-visible'));
    return;
  }
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => io.observe(el));
}

function countUp() {
  const els = document.querySelectorAll<HTMLElement>('[data-count]:not([data-counted])');
  if (!els.length) return;
  const animate = (el: HTMLElement) => {
    const raw = el.getAttribute('data-count') || '0';
    const target = parseFloat(raw);
    if (Number.isNaN(target)) {
      el.setAttribute('data-counted', '1');
      return;
    }
    const suffix = el.getAttribute('data-count-suffix') || '';
    const dur = parseInt(el.getAttribute('data-count-dur') || '1400', 10);
    const start = performance.now();
    el.setAttribute('data-counted', '1');
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = Math.floor(target * eased);
      el.textContent = `${val}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = `${target}${suffix}`;
    };
    requestAnimationFrame(tick);
  };
  if (REDUCED() || !('IntersectionObserver' in window)) {
    els.forEach(animate);
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          animate(e.target as HTMLElement);
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.5 }
  );
  els.forEach((el) => io.observe(el));
}

function cursorGlow() {
  if (REDUCED()) return;
  document.querySelectorAll<HTMLElement>('[data-glow]:not([data-glow-init])').forEach((el) => {
    el.setAttribute('data-glow-init', '1');
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    el.addEventListener('mousemove', onMove, { passive: true });
  });
}

function magnetic() {
  if (REDUCED()) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]:not([data-magnetic-init])').forEach((el) => {
    el.setAttribute('data-magnetic-init', '1');
    const strength = parseFloat(el.getAttribute('data-magnetic') || '0.25');
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const reset = () => {
      el.style.transform = '';
    };
    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', reset, { passive: true });
  });
}

function tilt() {
  if (REDUCED()) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]:not([data-tilt-init])').forEach((el) => {
    el.setAttribute('data-tilt-init', '1');
    const max = parseFloat(el.getAttribute('data-tilt') || '6');
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (py - 0.5) * -max;
      const ry = (px - 0.5) * max;
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    const reset = () => {
      el.style.transform = '';
    };
    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', reset, { passive: true });
  });
}

function init() {
  reveal();
  countUp();
  cursorGlow();
  magnetic();
  tilt();
}

if (!window.__mgAnimsInited) {
  window.__mgAnimsInited = true;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
  // Astro view transitions
  document.addEventListener('astro:page-load', () => {
    // Re-run for newly mounted content
    init();
  });
}
