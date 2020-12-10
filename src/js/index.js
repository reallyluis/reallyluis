/**
 * Enable offline mode
 */
firebase.firestore().enablePersistence().catch((err) => {
  if (err.code == 'failed-precondition') {
    // probably multiple tabs open
    console.log('persistence failed');
  } else if (err.code == 'unimplemented') {
    // lack of browser support
    console.log('persistence not available');
  }
});

/**
 * Connect to firestore.
 */
let db = null;

try {
  db = firebase ? firebase.firestore() : null;
} catch (err) {
  console.log('firebase not loaded.');
}

if (db) {
  // realtime listener
  db.collection('skills').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        // add the document data to dom
        renderSkill(change.doc.id, change.doc.data());
      } else if (change.type === 'removed') {
        // remove the document data from dom
        // removeSkill(change.doc.id);
      }
    });
  });

  db.collection('abouts').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        // add the document data to dom
        renderAbout(change.doc.id, change.doc.data());
      } else if (change.type === 'removed') {
        // remove the document data from dom
        // removeSkill(change.doc.id);
      }
    });
  });
}

// add new contact
const contactForm = document.querySelector('form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const contact = {
    name: contactForm.name.value,
    email: contactForm.email.value,
    comment: contactForm.comment.value,
  };

  if (db) {
    db.collection('contacts')
        .add(contact)
        .then(() => alert('Thanks!  Your message was sent successfully.'))
        .catch((err) => console.log(err));
  }

  // Reset form fields
  contactForm.name.value = '';
  contactForm.email.value = '';
  contactForm.comment.value = '';
});

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
 * Modal
 */
const workContainer = document.querySelector('#work');
const modalContainer = document.querySelector('.portfolio__modal');
const modalToggleLinks = document.querySelectorAll('.portfolio__item');
const modalContent = document.querySelector('.portfolio__content');
const portfolio = [{
  title: 'Entertainment',
  description: `Software Engineer at a large international entertainment \
    company where my responsibilities and accomplishments included: converted \
    legacy Backbone code to React; developed and maintained Jasmine and \
    Jest testing; performed code reviews on a regular basis; developed React \
    Native application to run on iOS and Android mobile devices; implemented \
    Cucumber tests for integration testing; and worked in a Scrum agile \
    software development environment.`,
}, {
  title: 'Business',
  description: `Software Engineer at a medium national business services \
    company where my responsibilities and accomplishments included: converted \
    site-wide Blue-Ridge JavaScript test suites to JSpec and later converted \
    from JSpec to Jasmine; developed on high-traffic and high-visibility areas \
    of the company\'s website including the homepage, search result page, and \
    listings\' more information pages; developed a lightweight, custom jQuery \
    plugin to handle lazy loading JavaScript and other assets to speed up \
    page loads; and worked in a large team that encouraged best practices, \
    code reviews and pair programming.`,
}, {
  title: 'Telecommunications',
  description: `Senior Web Developer at a small telecommunications company \
    where my responsibilities and accomplishments included: developed an email \
    management system with logging, read count, and click tracking that \
    dramatically improved Customer Service Representatives’ ability to respond \
    to customer calls; developed a customizable, reusable input field hints \
    application that improved user experience and reduced bad data entry; \
    developed and documented a customized Selenium web application test \
    solution that provided a foundation for a more solid and reliable \
    company-wide QA process; and worked in a Scrum agile software \
    development environment.`,
}, {
  title: 'Government',
  description: `Senior Web Developer at small government services company \
    where my responsibilities and accomplishments included: worked in a team \
    environment made up of onsite and remote (national and international) \
    stakeholders; worked with senior team members to monitor and progress \
    information technology (IT) infrastructure to support current and future \
    business goals; responsible for several proof-of-concepts and R&D \
    projects; project lead on code refactoring that improved average speed \
    on internal applications by 66% and external applications by 80%; \
    developed cross-browser client-side Web applications using code libraries \
    such as qForms, Yahoo UI Library, Ext JS, jQuery, Spry, and custom \
    JavaScript; and developed highly complex SQL queries, stored procedures, \
    views, replication, triggers, and scheduled jobs.`,
}, {
  title: 'Web',
  description: `Interactive Services Manager at a small web services company \
  where my responsibilities and accomplishments included: lead website \
  manager of content and functionality for large clients\' internal training \
  websites; lead developer for reports involving SQL queries, stored \
  procedures, views, and scheduled jobs on SQL Server 7/2000; managed the \
  error and help email inboxes for all portals and client specific websites; \
  built client-side JavaScript/AJAX application to improve client usability; \
  and lead migration for client specific ColdFusion MX to ASP.NET development.`,
}, {
  title: 'Electronics',
  description: `Technician at a large international electronics company where \
    my responsibilities and accomplishments included: document incoming and \
    outgoing hardware; run diagonostics to debug circuit boards; work with \
    engineers to debug and repair electronics; and QA repaired electronics \
    for verifications.`,
}];
modalToggleLinks.forEach((link) => {
  link.addEventListener('click', (el) => {
    el.stopPropagation();
    const id = el.target.parentElement.dataset.portfolio;
    const {title, description} = portfolio[id];
    const html = `
      <div data-id="${id}">
        <h3>${title}</h3>
        <p unselectable="on">${description}</p>
      </div>
    `;

    modalContent.innerHTML += html;
    modalContainer.classList.toggle('modal-show');
  });
});
workContainer.addEventListener('click', () => {
  modalContainer.classList.remove('modal-show');
  modalContent.innerHTML = '';
});

/**
 * Render skills content
 * @param {string} id The document data id.
 * @param {object} data The document data.
 */
const services = document.querySelector('.services');
const renderSkill = (id, data) => {
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
const abouts = document.querySelector('.about-me__body');
const renderAbout = (id, data) => {
  const {description} = data;
  const html = `
    <p data-id="${id}">${description}</p>
  `;

  abouts.innerHTML += html;
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
