document.addEventListener('DOMContentLoaded', () => {

  // Nav: scroll to in-page sections and mark the active link
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const href = link.getAttribute('href');
      const target = href && href.length > 1 && href.startsWith('#')
        ? document.querySelector(href)
        : null;

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

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

});
