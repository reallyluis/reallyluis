'use strict';

/**
 * Render skills content
 * @param {string} id The document data id.
 * @param {object} data The document data.
 */
const renderSkill = (id, data) => {
  const services = document.querySelector('.services');
  const {title, description} = data;
  const html = `
    <div class="service" data-id="${id}">
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
  `;

  if (services) {
    services.innerHTML += html;
  }
};

/**
 * Render about me content
 * @param {string} id The document data id.
 * @param {object} data The document data.
 */
const renderAbout = (id, data) => {
  const abouts = document.querySelector('.about-me__body');
  const {description} = data;
  const html = `
    <p data-id="${id}">${description}</p>
  `;

  if (abouts) {
    abouts.innerHTML += html;
  }
};

/**
 * Init and render works modal content
 * @param {object} works The works data
 */
const renderModal = (works) => {
  const workContainer = document.querySelector('#work');
  const modalContainer = document.querySelector('.portfolio__modal');
  const modalToggleLinks = document.querySelectorAll('.portfolio__item');
  const modalContent = document.querySelector('.portfolio__content');

  if (modalToggleLinks) {
    modalToggleLinks.forEach((link) => {
      link.addEventListener('click', (el) => {
        el.stopPropagation();
        const workid = el.target.parentElement.dataset.workid;
        const {title, description} = works[workid] ?
          works[workid] :
          {
            title: 'Oopss!',
            description: 'Something went wrong.  Please try again.',
          };
        const html = `
          <div data-id="${workid}">
            <h3>${title}</h3>
            <div unselectable="on">${description}</div>
          </div>
        `;

        modalContent.innerHTML += html;
        modalContainer.classList.toggle('modal-show');
      });
    });
  }

  if (workContainer) {
    workContainer.addEventListener('click', () => {
      modalContainer.classList.remove('modal-show');
      modalContent.innerHTML = '';
    });
  }
};

export {
  renderSkill,
  renderAbout,
  renderModal,
};
