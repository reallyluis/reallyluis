let spy;
global.SERVICE_WORKER_VERSION = '12345';

beforeEach(() => {
  spy = jest.spyOn(global, 'addEventListener');
  require('../src/service-worker');
});

test('check addEventListener is called three times', () => {
  expect(spy).toHaveBeenCalledTimes(3);
});
