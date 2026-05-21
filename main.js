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

  // Fecha: mostrar la fecha real del día en la barra superior
  const fechaEl = document.getElementById('fecha-actual');
  if (fechaEl) {
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                   'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const hoy = new Date();
    fechaEl.textContent =
      `${dias[hoy.getDay()]}, ${hoy.getDate()} ${meses[hoy.getMonth()]} ${hoy.getFullYear()}`;
  }

  // Ticker: duplicate content so the animation loops seamlessly
  const tickerInner = document.querySelector('.ticker-inner');
  if (tickerInner) {
    tickerInner.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + tickerInner.innerHTML;
  }

});
