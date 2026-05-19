document.addEventListener('DOMContentLoaded', () => {

  // Nav: active link on click
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Cards: "Leer más" click feedback
  document.querySelectorAll('.read-more').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const card = btn.closest('.card');
      const title = card.querySelector('h3')?.textContent ?? 'este artículo';
      alert(`Próximamente: "${title}"`);
    });
  });

  // Ticker: duplicate content so the animation loops seamlessly
  const tickerInner = document.querySelector('.ticker-inner');
  if (tickerInner) {
    tickerInner.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + tickerInner.innerHTML;
  }

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const header = document.querySelector('header');
  if (navToggle && header) {
    navToggle.addEventListener('click', () => {
      const open = header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Close menu when clicking a nav link
    document.querySelectorAll('nav a').forEach(a => {
      a.addEventListener('click', () => {
        if (header.classList.contains('nav-open')) {
          header.classList.remove('nav-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && header.classList.contains('nav-open')) {
        header.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

});
