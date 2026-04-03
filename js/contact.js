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
    btn.textContent = 'Preparing email…';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    const firstName = form.querySelector('#firstName').value.trim();
    const lastName = form.querySelector('#lastName').value.trim();
    const email = form.querySelector('#email').value.trim();
    const phone = form.querySelector('#phone').value.trim();
    const subject = form.querySelector('#subject').value || 'General Enquiry';
    const message = form.querySelector('#message').value.trim();

    const mailSubject = `[ZealEffect] ${subject} - ${firstName} ${lastName}`;
    const mailBody = `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nInterest: ${subject}\n\nMessage:\n${message}\n\nSent via ZealEffect website contact form.`;
    const mailto = `mailto:masiyateb@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

    window.location.href = mailto;

    setTimeout(function () {
      form.innerHTML = `
        <div class="form-success">
          <div class="form-success-icon">✅</div>
          <h3>Email Draft Opened</h3>
          <p>Your default email application should open so you can send your message to <strong>masiyateb@gmail.com</strong>.</p>
          <p>If it doesn't, please send your enquiry manually to <a href="mailto:masiyateb@gmail.com">masiyateb@gmail.com</a>.</p>
          <a href="index.html" class="btn btn-primary" style="margin-top:1.5rem">Back to Home</a>
        </div>
      `;
    }, 1500);
  });

})();
