/* ════════════════════════════════════════════════════════
   main.js
   Lenis (smooth scroll) + GSAP ScrollTrigger (parallax)

   Estrutura do scroll:
   ┌─────────────────────────────────────────┐
   │  .hero-wrapper  →  height: 300vh        │
   │  ┌───────────────────────────────────┐  │
   │  │  .hero  →  sticky, top:0, 100vh  │  │  ← fica colado no topo
   │  │  layers se movem dentro dele      │  │    durante 200vh de scroll
   │  └───────────────────────────────────┘  │
   └─────────────────────────────────────────┘
════════════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────
   1. LENIS — rolagem com inércia suave
───────────────────────────────────────────────────── */
const lenis = new Lenis({
  duration: 1.6,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  syncTouch: false,
});

// Sincroniza Lenis com ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// Corrige o pulo brusco de links âncora (como o botão Explorar)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    lenis.scrollTo(this.getAttribute('href'), {
      offset: 0,
      duration: 1.5
    });
  });
});

/* ─────────────────────────────────────────────────────
   2. PARALLAX RESPONSIVO (DESKTOP VS MOBILE)
───────────────────────────────────────────────────── */
// ── PARALLAX GLOBAL (Desktop e Mobile unificados) ──
  // img1 (montanha frontal) -> Sobe muito e rápido, revelando o pico no final do scroll
  gsap.to('.layer-1', {
    y: () => -window.innerHeight * 0.72,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-wrapper',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  // img2 (mist) -> Sobe médio
  gsap.to('.layer-2', {
    y: () => -window.innerHeight * 0.42,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-wrapper',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  // img3 (castelo/nuvens) -> Sobe pouco, mantendo o castelo visível perto do topo
  gsap.to('.layer-3', {
    y: () => -window.innerHeight * 0.22,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-wrapper',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  // img4 (céu) -> Praticamente estática
  gsap.to('.layer-4', {
    y: () => -window.innerHeight * 0.08,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-wrapper',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  // Texto desaparecendo subindo
  gsap.to(
    '.hero-eyebrow, .hero-title, .hero-subtitle, .hero-cta',
    {
      y: () => -window.innerHeight * 0.35,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-wrapper',
        start: 'top top',
        end: '40% top',
        scrub: true,
        invalidateOnRefresh: true,
      },
    }
  );

  // Indicador de scroll desaparece cedo
  gsap.to('.scroll-indicator', {
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-wrapper',
      start: 'top top',
      end: '15% top',
      scrub: true,
    },
  });

  // Céu escurecendo levemente no scroll
  gsap.to('.hero-sky', {
    opacity: 0.55,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-wrapper',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },
  });

/* ─────────────────────────────────────────────────────
   5. FADE-IN DE ENTRADA — animação ao carregar a página
───────────────────────────────────────────────────── */
const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

heroTl
  .from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.9, delay: 0.2 })
  .from('.hero-title', { y: 45, opacity: 0, duration: 1.0 }, '-=0.4')
  .from('.hero-subtitle', { y: 22, opacity: 0, duration: 0.85 }, '-=0.6')
  .from('.hero-cta', { y: 18, opacity: 0, duration: 0.7, scale: 0.94 }, '-=0.55')
  .from('.scroll-indicator', { opacity: 0, duration: 0.6 }, '-=0.2');

/* ─────────────────────────────────────────────────────
   6. SEÇÃO — fade-in ao entrar na viewport
───────────────────────────────────────────────────── */
gsap.from('.section-tag', {
  scrollTrigger: { trigger: '.section-tag', start: 'top 88%' },
  y: 28, opacity: 0, duration: 0.7, ease: 'power2.out',
});

gsap.from('.section-title', {
  scrollTrigger: { trigger: '.section-title', start: 'top 88%' },
  y: 42, opacity: 0, duration: 0.9, ease: 'power3.out',
});

gsap.from('.section-body', {
  scrollTrigger: { trigger: '.section-body', start: 'top 88%' },
  y: 28, opacity: 0, duration: 0.8, ease: 'power2.out',
});

gsap.from('.card', {
  scrollTrigger: { trigger: '.card-grid', start: 'top 82%' },
  y: 52, opacity: 0, duration: 0.85, stagger: 0.14, ease: 'power3.out',
});
