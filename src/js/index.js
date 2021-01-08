'use strict';
import {resetForm, mockData} from './helpers.js';
import {renderSkill, renderAbout, renderModal} from './renderers.js';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'reallyluis-13b43.firebaseapp.com',
  databaseURL: 'https://reallyluis-13b43.firebaseio.com',
  projectId: 'reallyluis-13b43',
  storageBucket: 'reallyluis-13b43.appspot.com',
  messagingSenderId: '641332133381',
  appId: '1:641332133381:web:77c83f2ffc96f51d7da66c',
};

const initialPage = () => {
  const works = {};
  // const pageError = document.querySelector('.page-error');

  /**
   * Initialize Firebase features
   */
  if (typeof firebase !== 'undefined') {
    /**
     * Initialize Firebase
     */
    firebase.initializeApp(firebaseConfig);

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
    console.log('firebase failed to load.');
    // pageError.classList.remove('hide');
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

    db.collection('works').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          // add the document data to dom
          works[change.doc.id] = change.doc.data();
        } else if (change.type === 'removed') {
          // remove the document data from dom
          delete works[change.doc.id];
        }
      });
    });
  } else {
    const mData = mockData();

    mData.skills.forEach((obj) => {
      renderSkill(obj.id, obj.data);
    });

    mData.about.forEach((obj) => {
      renderAbout(obj.id, obj.data);
    });

    mData.works.forEach((obj) => {
      works[obj.id] = obj.data;
    });
  }

  // add new contact
  const contactForm = document.querySelector('form');
  const contactSuccess = document.querySelector('.contact-me__success');
  const contactSubmitBtn = document.getElementById('contact-submit');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    contactSubmitBtn.disabled = true;
    const contact = {
      name: contactForm.name.value,
      email: contactForm.email.value,
      comment: contactForm.comment.value,
    };

    if (db) {
      db.collection('contacts').add(contact);

      contactForm.classList.add('hide');
      contactSuccess.classList.remove('hide');
      resetForm(contactForm, contactSubmitBtn);

      setTimeout(() => {
        contactForm.classList.remove('hide');
        contactSuccess.classList.add('hide');
      }, 2000);
    } else {
      resetForm(contactForm, contactSubmitBtn);
    }
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
   * Init and render modals
   */
  renderModal(works);

  /**
   * Hide page loading screen at end of initializing page
   */
  const pageLoading = document.querySelector('.page-loading');
  pageLoading.classList.add('hide');
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
    initialPage();
  });
} else {
  window.addEventListener('load', () => {
    initialPage();
  });
}

/**
 * Style changes based on scenarios
 */
// Update style based on scroll position
window.addEventListener('scroll', () => {
  if (typeof window.scrollY === 'number' && window.scrollY > 100) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
});
