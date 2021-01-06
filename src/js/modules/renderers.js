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

  services.innerHTML += html;
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

  abouts.innerHTML += html;
};

export {
  renderSkill,
  renderAbout,
};
