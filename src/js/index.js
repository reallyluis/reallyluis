const initialPage = () => {
  let logEvent = () => {};

  /**
   * Initialize Firebase features
   */
  if (typeof firebase !== 'undefined') {
    /**
     * Enable Analytics
     */
    const analytics = firebase.analytics();
    logEvent = analytics.logEvent;

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
  }

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
  const contactSuccess = document.querySelector('.contact-me__success');
  const contactSubmitBtn = document.getElementById('contact-submit');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactSubmitBtn.disabled = true;
    logEvent('contact_submitted');

    const contact = {
      name: contactForm.name.value,
      email: contactForm.email.value,
      comment: contactForm.comment.value,
    };
    const resetForm = () => {
      // Reset form fields
      contactForm.name.value = '';
      contactForm.email.value = '';
      contactForm.comment.value = '';
      contactSubmitBtn.disabled = false;
    };

    if (db) {
      db.collection('contacts')
          .add(contact)
          .then(() => {
            contactForm.classList.add('hide');
            contactSuccess.classList.remove('hide');
            resetForm();
            logEvent('contact_successful');

            setTimeout(() => {
              contactForm.classList.remove('hide');
              contactSuccess.classList.add('hide');
            }, 2000);
          })
          .catch((err) => console.log(err));
    } else {
      resetForm();
      logEvent('contact_failure');
    }
  });

  /**
   * Navigation
   */
  const navToggle = document.querySelector('.nav-toggle');
  navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
    logEvent('navigation_opened');
  });

  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      logEvent('navigation_closed');
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
    description: `Software Engineer at a large international entertainment
      company where my responsibilities and accomplishments included:
      <ul>
        <li>convert legacy Backbone and Angular code to React</li>
        <li>develop and maintain Jasmine and Jest testing</li>
        <li>develop React Native application to run on iOS and
          Android mobile devices</li>
        <li>develop Slackbot running on AWS services</li>
        <li>implement Cucumber tests for integration testing</li>
        <li>perform code reviews on a regular basis</li>
        <li>work in a Scrum agile software development environment</li>
      </ul>`,
  }, {
    title: 'Business',
    description: `Software Engineer at a medium national business services
      company where my responsibilities and accomplishments included:
      <ul>
        <li>convert Blue-Ridge JavaScript test suites to JSpec and later
          convert to Jasmine</li>
        <li>develop high-traffic and high-visibility company website homepage,
          search result page, and clients' more information pages</li>
        <li>develop lightweight, custom jQuery plugins to handle lazy loading
          JavaScript and other assets to optimize page loads</li>
        <li>work in a large team following best practices, code reviews
          and pair programming</li>
      </ul>`,
  }, {
    title: 'Telecommunications',
    description: `Senior Web Developer at a small telecommunications company
      where my responsibilities and accomplishments included:
      <ul>
        <li>develop an email management application with logging, read
          count, and click tracking that dramatically improve Customer Service
          Representatives' ability to respond to customer calls</li>
        <li>develop a customizable, reusable input field hints package
          that improve user experience and reduce bad data entry</li>
        <li>develop and document a custom Selenium web application testing
          solution that provide a foundation for a solid and reliable QA
          process</li>
        <li>work in a Scrum agile software development environment</li>
      </ul>`,
  }, {
    title: 'Government',
    description: `Senior Web Developer at small government services company
      where my responsibilities and accomplishments included:
      <ul>
        <li>work in a team made up of onsite and remote stakeholders</li>
        <li>develop proof-of-concepts and R&D projects</li>
        <li>lead code refactor improving average speed on internal applications
          by 66% and external applications by 80%</li>
        <li>develop cross-browser components using code libraries such as
          qForms, Yahoo UI Library, Ext JS, jQuery, Spry, and custom
          JavaScript</li>
        <li>develop optimized SQL queries, stored procedures, views,
          replication, triggers, and scheduled jobs</li>
      </ul>`,
  }, {
    title: 'Web',
    description: `Interactive Services Manager at a small web services company
      where my responsibilities and accomplishments included:
      <ul>
        <li>manage content and functionality for large clients' internal
          training websites</li>
        <li>lead developer for reports involving SQL queries, stored procedures,
          views, and scheduled jobs on SQL Server</li>
        <li>manage error and help email inboxes for all portals and client
          specific websites</li>
        <li>build JavaScript application to improve client usability</li>
        <li>lead migration for client ColdFusion MX applications to .NET
          development</li>
      </ul>`,
  }, {
    title: 'Electronics',
    description: `Technician at a large international electronics company where
      my responsibilities and accomplishments included:
      <ul>
        <li>document incoming and outgoing hardware</li>
        <li>run diagonostics to debug circuit boards</li>
        <li>work with engineers to debug and repair electronics</li>
        <li>QA repaired electronics for verifications</li>
      </ul>`,
  }];
  modalToggleLinks.forEach((link) => {
    link.addEventListener('click', (el) => {
      el.stopPropagation();
      const id = el.target.parentElement.dataset.portfolio;
      const {title, description} = portfolio[id];
      const html = `
        <div data-id="${id}">
          <h3>${title}</h3>
          <div unselectable="on">${description}</div>
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
   * Hide page loading screen at end of initializing page
   */
  const pageLoading = document.querySelector('.page-loading');
  const navContainer = document.querySelector('.nav');
  pageLoading.classList.add('hide');
  setTimeout(() => {
    navContainer.classList.remove('hide');
  }, 300);
};

/**
 * Service worker
 */
// Check that service workers are supported
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
    logEvent('service_worker_registered');
    initialPage();
    // .then((reg) => console.log('service worker registered', reg))
    // .catch((err) => console.log('service worker not registered', err));
  });
} else {
  window.addEventListener('load', () => {
    logEvent('service_worker_failure');
    initialPage();
  });
}
