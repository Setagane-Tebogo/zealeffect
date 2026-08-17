document.addEventListener('DOMContentLoaded', function(){

  const wa = (n)=>n.toWhatsApp;

  /* Mobile nav toggle */
  const navToggle = document.getElementById('navToggle');
  const navlinks = document.querySelector('.navlinks');
  if (navToggle && navlinks) {
    navToggle.addEventListener('click', function(){
      if(navlinks.style.display === 'flex'){
        navlinks.style.display = 'none';
      } else {
        navlinks.style.display = 'flex';
        navlinks.style.flexDirection = 'column';
        navlinks.style.position = 'absolute';
        navlinks.style.top = '64px';
        navlinks.style.right = '24px';
        navlinks.style.background = '#182430';
        navlinks.style.border = '1px solid #2A3A48';
        navlinks.style.borderRadius = '8px';
        navlinks.style.padding = '16px 20px';
        navlinks.style.gap = '14px';
      }
    });
  }

  /* Quick hero form -> redirect to booking page */
  const quickForm = document.getElementById('quickForm');
  if (quickForm) {
    quickForm.addEventListener('submit', function(e){
      e.preventDefault();
      const quickData = {
        from: document.getElementById('qFrom')?.value || '',
        to: document.getElementById('qTo')?.value || '',
        date: document.getElementById('qDate')?.value || '',
        pax: document.getElementById('qPax')?.value || '1'
      };
      sessionStorage.setItem('route24Quick', JSON.stringify(quickData));
      window.location.href = 'book.html';
    });
  }

  /* Prefill booking page from quick form */
  const storedQuick = sessionStorage.getItem('route24Quick');
  if (storedQuick) {
    try {
      const quickData = JSON.parse(storedQuick);
      if (quickData.from && document.getElementById('bPickup')) {
        document.getElementById('bPickup').value = quickData.from;
      }
      if (quickData.to && document.getElementById('bDrop')) {
        document.getElementById('bDrop').value = quickData.to;
      }
      if (quickData.date && document.getElementById('bDate')) {
        document.getElementById('bDate').value = quickData.date;
      }
      if (quickData.pax && document.getElementById('bPassengers')) {
        document.getElementById('bPassengers').value = quickData.pax.match(/\d+/) ? quickData.pax.match(/\d+/)[0] : quickData.pax;
      }
    } catch (err) {
      console.warn('Unable to parse quick booking data', err);
    }
  }

  /* Booking submission -> WhatsApp */
  const bookForm = document.getElementById('bookForm');

  if(bookForm) {
    bookForm.addEventListener('submit', function(e){
      e.preventDefault();
      
      const name = document.getElementById('bName').value || 'Passenger';
      const phone = document.getElementById('bPhone').value;
      const pickup = document.getElementById('bPickup').value;
      const drop = document.getElementById('bDrop').value;
      const date = document.getElementById('bDate').value;
      const time = document.getElementById('bTime').value;
      const pax = document.getElementById('bPassengers').value;
      const notes = document.getElementById('bNotes').value;

      if(!name || !phone || !pickup || !drop || !date || !time || !pax) {
        alert('Please fill in all required fields');
        return;
      }

      const msg = `*Mafosholo Shuttle Booking Request*%0A%0A` +
        `Name: ${name}%0A` +
        `Phone: ${phone}%0A` +
        `Pickup: ${pickup}%0A` +
        `Destination: ${drop}%0A` +
        `Date: ${date}%0A` +
        `Time: ${time}%0A` +
        `Passengers: ${pax}%0A` +
        `${notes ? 'Message: ' + notes : ''}`;

      const waLink = `https://wa.me/27601948503?text=${encodeURIComponent(msg)}`;
      window.open(waLink, '_blank');
    });
  }

  /* Contact form */
  const contactForm = document.getElementById('contactForm');
  if(contactForm) {
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      const contactToast = document.getElementById('contactToast');
      if(contactToast) contactToast.classList.add('show');
      this.reset();
    });
  }

});
