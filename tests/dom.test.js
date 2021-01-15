const {JSDOM} = require('jsdom');
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(
    __dirname,
    '../src/index.html',
), 'utf8');

let dom;
let container;
const options = {
  runScripts: 'dangerously',
};

beforeEach(() => {
  dom = new JSDOM(html, options);
  container = dom.window.document.body;
});

test('initial body class is empty', () => {
  const classes = container.classList;
  expect(classes).toHaveLength(0);
});

test('check title renders with expected text', () => {
  const title = container.querySelector('.section__subtitle').innerHTML;
  expect(title).toMatchSnapshot();
});

test('check portfolio has correct number of images', () => {
  const work = container.querySelector('#work');
  const imgs = work.querySelectorAll('img');

  expect(imgs).toHaveLength(6);
});

test('check footer renders expected icons', () => {
  const footer = container.querySelector('footer').innerHTML;
  expect(footer).toMatchSnapshot();
});
