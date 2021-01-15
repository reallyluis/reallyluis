import {scrollOnLoad, resetForm, mockData} from '../../src/js/helpers';

global.scrollTo = jest.fn();

let spy;

beforeEach(() => {
  spy = jest.spyOn(global, 'scrollTo');
});

test('check scrollTo is called', () => {
  global.document.location.hash = 'test';
  global.document.body.innerHTML = '<div id="test"></div>';

  scrollOnLoad();

  expect(spy).toHaveBeenCalled();
});

test('clear contact form on reset', () => {
  const mockForm = {
    name: {value: 'Test User'},
    email: {value: 'test@email.com'},
    comment: {value: 'This is a test comment.'},
  };
  const mockSubmitBtn = {
    disabled: true,
  };

  resetForm(mockForm, mockSubmitBtn);

  expect(mockForm.name.value).toEqual('');
  expect(mockForm.email.value).toEqual('');
  expect(mockForm.comment.value).toEqual('');
  expect(mockSubmitBtn.disabled).toEqual(false);
});

test('mock data', () => {
  const data = mockData();

  expect(data).toMatchSnapshot();
});
