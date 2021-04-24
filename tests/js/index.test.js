import {TEMPLATES} from './constants';
import * as app from '../../src/js/index';

global.console = {
  log: jest.fn(),
  warn: jest.fn(),
};
global.firebase = {
  initializeApp: jest.fn(),
  firestore: () => {
    return {
      collection: () => {
        return {
          onSnapshot: (fn) => {
            fn({
              docChanges: () => [{
                type: 'added',
                doc: {id: 1, data: () => [{
                  title: 'Test Title',
                  description: 'Test description...',
                }]},
              },
              {
                type: 'removed',
                doc: {id: 1, data: jest.fn()},
              }],
            });
          },
          add: jest.fn(),
        };
      },
      enablePersistence: () => {
        return {
          catch: (fn) => {
            fn({code: 'unimplemented'});
          },
        };
      },
    };
  },
};
global.matchMedia = () => {
  return {
    matches: true,
    addEventListener: jest.fn(),
  };
};
global.navigator = {
  serviceWorker: {
    register: jest.fn(),
  },
};

let spy;

beforeEach(() => {
  document.body.innerHTML = TEMPLATES;
});

test('check firebase config', () => {
  app.initPage();

  expect(app.firebaseConfig).toMatchSnapshot();
});

describe('darkmode events', () => {
  beforeEach(() => {
    document.body.innerHTML = TEMPLATES +
      '<div class="darkmode-toggle">' +
      '  <input type="checkbox" id="darkmode-toggle"' +
      '    class="darkmode-toggle__checkbox" />' +
      '  <label for="darkmode-toggle" class="darkmode-toggle__label">' +
      '    Toggle</label>' +
      '</div>';

    app.initPage();
  });

  test('update body class on darkmode toggled', () => {
    document.querySelector('.darkmode-toggle__checkbox').click();

    expect(document.body).toMatchSnapshot();
  });
});

describe('navigation events', () => {
  beforeEach(() => {
    document.body.innerHTML = TEMPLATES +
      '<button class="nav-toggle"></button>' +
      '<nav class="nav">' +
      '  <ul class="nav__list">' +
      '    <li class="nav__item">' +
      '     <a href="#one" class="nav__link">one</a></li>' +
      '  </ul>' +
      '</nav>';

    app.initPage();
  });

  test('update body class on nav toggled', () => {
    document.querySelector('.nav-toggle').click();

    expect(document.body).toMatchSnapshot();
  });

  test('update body class on nav clicked', () => {
    document.body.classList.add('nav-open');
    document.querySelector('.nav__link').click();

    expect(document.body).toMatchSnapshot();
  });
});

describe('contact form events', () => {
  beforeEach(() => {
    document.body.innerHTML = TEMPLATES +
      '<form id="contact" class="contact-me__form">' +
      '  <label for="fname">' +
      '    Name:' +
      '  </label>' +
      '  <input type="text" id="fname" name="fname" value="" required />' +
      '  <label for="email">' +
      '    Email:' +
      '  </label>' +
      '  <input type="email" id="email" name="email" value="" required />' +
      '  <label for="comment">' +
      '    Comment:' +
      '  </label>' +
      '  <textarea id="comment" name="comment" cols="30" rows="5" required>' +
      '  </textarea>' +
      '  <button id="contact-submit" type="submit">Send</button>' +
      '</form>' +
      '<div class="contact-me__success hide">' +
      '  <p><b>Thanks!</b>  Your message was sent successfully.</p>' +
      '</div>';

    app.initPage();
  });

  test('update contact form on submit', () => {
    const form = document.querySelector('form');

    // Mock form fields
    form['fname'] = {value: ''};
    form['email'] = {value: ''};
    form['comment'] = {value: ''};

    spy = jest.spyOn(global.firebase, 'initializeApp');
    form.submit();

    // expect(document.body).toMatchSnapshot();
    expect(spy).toHaveBeenCalled();
  });
});

describe('scroll events', () => {
  beforeEach(() => {
    document.body.innerHTML = TEMPLATES +
      '<div style="height:1000px">' +
      ' <div class="page-controls__comment">&nbsp;</div>' +
      ' <section id="test-section-1">&nbsp;<section>' +
      ' <section id="test-section-2">&nbsp;<section>' +
      ' <section id="test-section-3">&nbsp;<section>' +
      '</div>';

    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      get: function() {
        return this._scrollHeight || 0;
      },
      set(val) {
        this._scrollHeight = val;
      },
    });

    app.initPage();
  });

  test('update after scroll less than 100', () => {
    window.scrollY = 99;
    window.dispatchEvent(new Event('scroll'));

    expect(document.body).toMatchSnapshot();
  });

  test('update after scroll greater than 100', () => {
    window.scrollY = 101;
    window.dispatchEvent(new Event('scroll'));

    expect(document.body).toMatchSnapshot();
  });

  test('update after scroll greater than 75% of view', () => {
    window.scrollY = 800;
    document.body.scrollHeight = 1000;
    window.dispatchEvent(new Event('scroll'));

    expect(document.body).toMatchSnapshot();
  });
});
