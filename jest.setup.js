// Set jest global mocks
class IntersectionObserver {
  constructor(handleIntersect, options) {
    this.handleIntersect = handleIntersect;
    this.options = options || {};

    return {
      observe: () => null,
    };
  }
}
global.IntersectionObserver = IntersectionObserver;

global.fetch = () =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  });
