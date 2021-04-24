'use strict';

const loadSkillSection = () => {
  const body = document.querySelector('body');
  const template = body.querySelector('#template-skills');
  const skill = template.content.cloneNode(true);

  body.appendChild(skill);
};

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

const loadAboutSection = () => {
  const body = document.querySelector('body');
  const template = body.querySelector('#template-about');
  const about = template.content.cloneNode(true);

  body.appendChild(about);
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

const loadWorkSection = () => {
  const body = document.querySelector('body');
  const template = body.querySelector('#template-work');
  const work = template.content.cloneNode(true);

  body.appendChild(work);
};

/**
 * Init and render works modal content
 * @param {object} works The works data
 */
const renderModal = (works) => {
  const modalToggleLinks = document.querySelectorAll('.portfolio__item');
  const modalContainer = document.querySelector('.page-modal');
  const modalContent = document.querySelector('.page-modal__content');

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
        modalContainer.classList.toggle('hide');
      });
    });
  }

  if (modalContainer) {
    modalContainer.addEventListener('click', () => {
      modalContainer.classList.add('hide');
      modalContent.innerHTML = '';
    });
  }
};

const loadContactSection = () => {
  const body = document.querySelector('body');
  const template = body.querySelector('#template-contact');
  const contact = template.content.cloneNode(true);

  body.appendChild(contact);
};

const loadFooterSection = () => {
  const body = document.querySelector('body');
  const template = body.querySelector('#template-footer');
  const footer = template.content.cloneNode(true);

  body.appendChild(footer);
};

export {
  loadSkillSection,
  renderSkill,
  loadAboutSection,
  renderAbout,
  loadWorkSection,
  renderModal,
  loadContactSection,
  loadFooterSection,
};
