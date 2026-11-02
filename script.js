const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
nav.addEventListener('click', e => {
  if (e.target.closest('a')) {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  }
});

document.getElementById('quote').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const body = [
    `Name: ${f.get('name')}`,
    `Contact: ${f.get('contact')}`,
    `Vehicle: ${f.get('vehicle') || '-'}`,
    '',
    f.get('parts'),
  ].join('\n');
  location.href = `mailto:sales@pickapartmw.com?subject=${encodeURIComponent('Quote request from website')}&body=${encodeURIComponent(body)}`;
});

document.getElementById('yr').textContent = new Date().getFullYear();

document.querySelectorAll('.more[data-part]').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('#quote [name="parts"]').value = `I'd like a quote for ${link.dataset.part}: `;
  });
});

// Scroll to in-page sections without leaving #hash in the URL, so a refresh stays put
document.addEventListener('click', e => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute('href').slice(1);
  const target = id ? document.getElementById(id) : document.body;
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  history.replaceState(null, '', location.pathname + location.search);
});
