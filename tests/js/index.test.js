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
          onSnapshot: jest.fn(),
        };
      },
      enablePersistence: () => {
        return {
          catch: jest.fn(),
        };
      },
    };
  },
};

beforeEach(() => {
  document.body.innerHTML = '';
});

test('check firebase config', () => {
  app.initialPage();

  expect(app.firebaseConfig).toMatchSnapshot();
});

describe('navigation events', () => {
  beforeEach(() => {
    document.body.innerHTML = '' +
      '<button class="nav-toggle"></button>' +
      '<nav class="nav">' +
      '  <ul class="nav__list">' +
      '    <li class="nav__item">' +
      '     <a href="#one" class="nav__link">one</a></li>' +
      '  </ul>' +
      '</nav>';

    app.initialPage();
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
    document.body.innerHTML = '' +
      '<form id="contact" class="contact-me__form">' +
      '  <label for="name">' +
      '    Name:' +
      '  </label>' +
      '  <input type="text" id="name" name="name" value="" required />' +
      '  <label for="email">' +
      '    Email:' +
      '  </label>' +
      '  <input type="text" id="email" name="email" value="" required />' +
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

    app.initialPage();
  });

  test('update contact form on submit', () => {
    expect(document.body).toMatchSnapshot();
  });
});

describe('scroll events', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div style="height:1000px">' +
      ' <div class="page-controls__comment">&nbsp;</div>' +
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

    app.initialPage();
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
