/* =============================================
   CONTACT.JS — Contact form handling
   ============================================= */

(function () {
  'use strict';

  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    setTimeout(function () {
      form.innerHTML = `
        <div class="form-success">
          <div class="form-success-icon">✅</div>
          <h3>Message Sent!</h3>
          <p>Thank you for reaching out. Our team will get back to you within 1 business day.</p>
          <a href="index.html" class="btn btn-primary" style="margin-top:1.5rem">Back to Home</a>
        </div>
      `;
    }, 1500);
  });

})();
