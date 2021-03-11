let spy;
global.SERVICE_WORKER_VERSION = '12345';
// global.fetch = jest.fn((evt) => console.log(evt));

beforeEach(() => {
  spy = jest.spyOn(global, 'addEventListener');
  require('../src/service-worker');
});

test('check addEventListener is called three times', () => {
  expect(spy).toHaveBeenCalledTimes(3);
});

test.skip('check limitCacheSize', () => {
  const fetch = new CustomEvent('fetch', {
    respondWith: () => {},
    request: {
      url: '',
    },
  });

  dispatchEvent(fetch);
});
