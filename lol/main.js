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

});
