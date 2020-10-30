// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDgTYW7KIAmjew2W5tE1u1fzOarOBZ1zpw',
  authDomain: 'reallyluis-13b43.firebaseapp.com',
  databaseURL: 'https://reallyluis-13b43.firebaseio.com',
  projectId: 'reallyluis-13b43',
  storageBucket: 'reallyluis-13b43.appspot.com',
  messagingSenderId: '641332133381',
  appId: '1:641332133381:web:77c83f2ffc96f51d7da66c',
  measurementId: 'G-LY8BFQ097C',
};

// Initialize Firebase
if (firebase) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const db = firebase.firestore();

  // offline data
  db.enablePersistence().catch((err) => {
    if (err.code == 'failed-precondition') {
      // probably multiple tabs open
      console.log('persistence failed');
    } else if (err.code == 'unimplemented') {
      // lack of browser support
      console.log('persistence not available');
    }
  });

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
    db.collection('contact')
        .add(contact)
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
