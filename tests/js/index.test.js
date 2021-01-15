import * as app from '../../src/js/index';

global.console = {
  log: jest.fn(),
  warn: jest.fn(),
};

beforeEach(() => {
  app.initialPage();
});

test('check firebase config', () => {
  expect(app.firebaseConfig).toMatchSnapshot();
});
