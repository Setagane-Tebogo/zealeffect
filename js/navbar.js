/* =============================================
   NAVBAR.JS — Sticky navbar, hamburger, dropdowns
   ============================================= */

(function () {
  'use strict';

  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.getElementById('navLinks');

  // ---- Scroll: add .scrolled class ----
  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // ---- Hamburger toggle ----
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // ---- Mobile dropdowns: tap to open ----
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(function (dropdown) {
    const trigger = dropdown.querySelector('a');

    trigger.addEventListener('click', function (e) {
      // Only intercept on small screens (hamburger visible)
      if (window.innerWidth <= 900) {
        e.preventDefault();
        dropdown.classList.toggle('open');
      }
    });
  });

  // ---- Close nav when clicking outside ----
  document.addEventListener('click', function (e) {
    if (navbar && !navbar.contains(e.target)) {
      navLinks && navLinks.classList.remove('open');
      hamburger && hamburger.classList.remove('open');
    }
  });

  // ---- Active link highlighting ----
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && href.split('#')[0] === currentPath) {
      link.classList.add('active');
    }
  });

})();
