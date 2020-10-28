/**
 * Navigation
 */
const navToggle = document.querySelector('.nav-toggle');
navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
});

const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
  });
});

/**
 * Contact Form
 */
const contactForm = document.querySelector('#contact');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // TODO: Use firestore to store (offline) then submit when back online

  // Reset form fields
  contactForm.querySelector('#name').value = '';
  contactForm.querySelector('#email').value = '';
  contactForm.querySelector('#comment').value = '';
});

/**
 * Service worker
 */
// Check that service workers are supported
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
    // .then((reg) => console.log('service worker registered', reg))
    // .catch((err) => console.log('service worker not registered', err));
  });
}
