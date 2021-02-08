import {user} from '../../src/ts/user';

test('check user object', () => {
  expect(user).toMatchSnapshot();
});