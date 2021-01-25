import {
  scrollOnLoad,
  resetUrlHash,
  updateHashOnScrollStop,
  resetForm,
  mockData,
} from '../../src/js/helpers';

global.scrollTo = jest.fn();
global.history = {
  pushState: jest.fn(),
};

let spy;

describe('scrollOnLoad method', () => {
  beforeEach(() => {
    spy = jest.spyOn(global, 'scrollTo');
  });

  test('check scrollTo is called', () => {
    global.document.location.hash = 'test';
    global.document.body.innerHTML = '<div id="test"></div>';

    scrollOnLoad();

    expect(spy).toHaveBeenCalled();
  });
});

describe('resetUrlHash method', () => {
  beforeEach(() => {
    spy = jest.spyOn(global.history, 'pushState');
  });

  test('check pushState is called', () => {
    global.document.location.hash = 'test';

    resetUrlHash();

    expect(spy).toHaveBeenCalled();
  });
});

describe('updateHashOnScrollStop method', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div style="height:1000px">' +
      ' <div class="page-controls__comment">&nbsp;</div>' +
      ' <section id="test-section-1">&nbsp;<section>' +
      ' <section id="test-section-2">&nbsp;<section>' +
      ' <section id="test-section-3">&nbsp;<section>' +
      '</div>';
  });

  test('check dom updates on scroll stop', () => {
    updateHashOnScrollStop();

    expect(document.body).toMatchSnapshot();
  });
});

describe('resetForm method', () => {
  test('clear contact form on reset', () => {
    const mockForm = {
      fname: {value: 'Test User'},
      email: {value: 'test@email.com'},
      comment: {value: 'This is a test comment.'},
    };
    const mockSubmitBtn = {
      disabled: true,
    };

    resetForm(mockForm, mockSubmitBtn);

    expect(mockForm.fname.value).toEqual('');
    expect(mockForm.email.value).toEqual('');
    expect(mockForm.comment.value).toEqual('');
    expect(mockSubmitBtn.disabled).toEqual(false);
  });
});

describe('mockData method', () => {
  test('mock data', () => {
    const data = mockData();

    expect(data).toMatchSnapshot();
  });
});
