require('../src/js/index');

test('initial body class is empty', () => {
  expect(document.body.classList.length).toBe(0);
});
