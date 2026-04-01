/* =============================================
   ANIMATIONS.JS — Scroll-triggered reveal
   ============================================= */

(function () {
  'use strict';

  // ---- IntersectionObserver for .reveal elements ----
  const revealTargets = document.querySelectorAll('.reveal, .reveal-delay, .stagger-children');

  if (!revealTargets.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealTargets.forEach(function (el) {
    observer.observe(el);
  });

  // ---- Stat counter animation ----
  const stats = document.querySelectorAll('.stat-num');

  const statObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach(function (el) {
    statObserver.observe(el);
  });

  function animateCounter(el) {
    const text    = el.textContent.trim();
    const numMatch = text.match(/[\d]+/);
    if (!numMatch) return; // e.g. "QCTO" — skip

    const target   = parseInt(numMatch[0], 10);
    const suffix   = text.replace(numMatch[0], '').replace(/^\d+/, '');
    const prefix   = text.slice(0, text.indexOf(numMatch[0]));
    const duration = 1200;
    const start    = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease     = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current  = Math.round(ease * target);
      el.textContent = prefix + current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

})();
