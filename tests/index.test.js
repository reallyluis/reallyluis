const jsdom = require('jsdom');
const {JSDOM} = jsdom;
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(
    __dirname,
    '../src/index.html',
), 'utf8');
// require('../src/js/index');

let dom;
let container;
const options = {
  // resources: 'usable',
  runScripts: 'dangerously',
};

beforeEach(() => {
  dom = new JSDOM(html, options);
  // dom.window.addEventListerner('load', () => {
  container = dom.window.document.body;
  // });
});

test('initial body class is empty', () => {
  const classes = container.classList;
  expect(classes).toHaveLength(0);
});

test('check title rendered text', () => {
  const title = container.querySelector('.section__subtitle').innerHTML;
  expect(title).toMatchSnapshot();
});

test('check footer icons', () => {
  const footer = container.querySelector('footer').innerHTML;
  expect(footer).toMatchSnapshot();
});
