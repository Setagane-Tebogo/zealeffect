/* =============================================
   GALLERY.JS — Filter tabs & lightbox
   ============================================= */

(function () {
  'use strict';

  /* ---- Filter buttons ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.getAttribute('data-filter');

      // Update active button
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      // Show / hide items
      galleryItems.forEach(function (item) {
        const category = item.getAttribute('data-category');
        const show = filter === 'all' || category === filter;

        if (show) {
          item.style.display = '';
          // Re-trigger reveal animation
          item.classList.remove('visible');
          requestAnimationFrame(function () {
            setTimeout(function () {
              item.classList.add('visible');
            }, 50);
          });
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ---- Simple lightbox ---- */
  const thumbs = document.querySelectorAll('.gallery-thumb');

  // Build lightbox DOM
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = '<div class="lightbox-inner"><button class="lightbox-close" aria-label="Close">✕</button><div class="lightbox-content"></div></div>';
  document.body.appendChild(lightbox);

  const lbContent = lightbox.querySelector('.lightbox-content');
  const lbClose   = lightbox.querySelector('.lightbox-close');

  thumbs.forEach(function (thumb) {
    thumb.style.cursor = 'pointer';
    thumb.addEventListener('click', function () {
      // Clone the thumb into lightbox
      const clone = thumb.cloneNode(true);
      clone.style.width  = '100%';
      clone.style.height = '70vh';
      clone.style.borderRadius = '12px';
      clone.style.cursor = 'default';
      lbContent.innerHTML = '';
      lbContent.appendChild(clone);
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  lbClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

})();
