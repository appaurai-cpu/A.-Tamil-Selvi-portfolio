const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];

toggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

navAnchors.forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

const sections = navAnchors.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navAnchors.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => observer.observe(section));

document.getElementById('year').textContent = new Date().getFullYear();
