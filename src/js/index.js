const services = document.querySelector('.services');

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
 * renderSkill: Render skillls content
 * @param {string} id The document data id.
 * @param {object} data The document data.
 */
window.renderSkill = (id, data) => {
  const {title, description} = data;
  const html = `
    <div class="service" data-id="${id}">
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
  `;

  services.innerHTML += html;
};

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
