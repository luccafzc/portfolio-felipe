/* ========================
   PORTFÓLIO FELIPE LUCCA — script.js
======================== */

// ── Cursor customizado ───────────────────────────────────────
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

// Cursor com suavização
function animarCursor() {
  cursorX += (mouseX - cursorX) * 0.12;
  cursorY += (mouseY - cursorY) * 0.12;
  cursor.style.left = cursorX + 'px';
  cursor.style.top  = cursorY + 'px';
  requestAnimationFrame(animarCursor);
}
animarCursor();

// ── Nav scroll ───────────────────────────────────────────────
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
});

// ── Formulário de contato ────────────────────────────────────
const form   = document.getElementById('contatoForm');
const formOk = document.getElementById('formOk');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = form.querySelector('.form-btn');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  // Em produção: substituir por fetch para backend ou serviço como Formspree
  setTimeout(() => {
    form.reset();
    btn.textContent = 'Enviar mensagem';
    btn.disabled = false;
    formOk.classList.add('visivel');
    setTimeout(() => formOk.classList.remove('visivel'), 5000);
  }, 1000);
});

// ── Reveal ao rolar ──────────────────────────────────────────
const revelaveis = document.querySelectorAll('.projeto, .clink, .fg');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visivel');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revelaveis.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${i * 0.05}s`;
  observer.observe(el);
});

// ── Efeito parallax leve no hero ─────────────────────────────
const heroNome = document.querySelector('.hero-nome');
const heroNum  = document.querySelector('.hero-numero-grande');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (heroNome) heroNome.style.transform = `translateY(${y * 0.08}px)`;
  if (heroNum)  heroNum.style.transform  = `translateY(${y * 0.04}px)`;
});
