// ---------- Mobile menu ----------
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});

navLinks.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

// ---------- FAQ accordion ----------
document.querySelectorAll('.acc-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !isOpen);
    panel.hidden = isOpen;
  });
});

// ---------- Enquiry modal ----------
const modal = document.getElementById('enquiryModal');
const modalTitle = document.getElementById('modalTitle');
const form = document.getElementById('enquiryForm');
const statusBox = document.getElementById('formStatus');
let lastTrigger = null;

document.querySelectorAll('[data-open-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    lastTrigger = btn;
    modalTitle.textContent = btn.dataset.title || 'Enquire Now';
    statusBox.hidden = true;
    form.hidden = false;
    modal.showModal();
  });
});

document.getElementById('closeModal').addEventListener('click', () => modal.close());

// Close when clicking outside the box
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.close();
});

// Return focus to the button that opened the modal
modal.addEventListener('close', () => { if (lastTrigger) lastTrigger.focus(); });

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('parentName').value.trim();
  statusBox.textContent = `Thank you, ${name}! Your request has been received. Our admissions team will contact you within 24 hours.`;
  statusBox.hidden = false;
  form.reset();
  form.hidden = true;
});

// ---------- Animated counters ----------
const counters = document.querySelectorAll('.num');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateCounter(el) {
  const target = +el.dataset.target;
  if (reduceMotion) { el.textContent = target.toLocaleString(); return; }
  const duration = 1500;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => observer.observe(c));

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();