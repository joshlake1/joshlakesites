/**
 * The Copper Kettle — Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initAgeGate();
  initHeader();
  initMobileNav();
  initMenuTabs();
  initContactForm();
  initScrollAnimations();
  initSmoothScroll();
});

/* --- Age Verification Gate --- */
function initAgeGate() {
  const gate = document.getElementById('age-gate');
  if (!gate) return;

  if (sessionStorage.getItem('ageVerified') === 'true') {
    gate.classList.add('hidden');
    return;
  }

  const confirmBtn = document.getElementById('age-confirm');
  const denyBtn = document.getElementById('age-deny');

  confirmBtn?.addEventListener('click', () => {
    sessionStorage.setItem('ageVerified', 'true');
    gate.classList.add('hidden');
    document.body.style.overflow = '';
  });

  denyBtn?.addEventListener('click', () => {
    window.location.href = 'https://www.drinkaware.co.uk/';
  });

  document.body.style.overflow = 'hidden';
}

/* --- Sticky Header --- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- Mobile Navigation --- */
function initMobileNav() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* --- Menu Tabs --- */
function initMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(target)?.classList.add('active');
    });
  });
}

/* --- Contact Form --- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const required = form.querySelectorAll('[required]');
    let valid = true;

    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#c44';
        valid = false;
      }
    });

    const emailField = form.querySelector('[type="email"]');
    if (emailField?.value && !isValidEmail(emailField.value)) {
      emailField.style.borderColor = '#c44';
      valid = false;
    }

    if (!valid) return;

    const success = document.getElementById('form-success');
    if (success) {
      success.classList.add('visible');
      form.reset();
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* --- Scroll Animations --- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* --- Smooth Scroll for Anchor Links --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerOffset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}
