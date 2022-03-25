const {signup,login} = require('./signup_login');

test('sign up and login', async() => {

  const signUpUser = await signup()
  const token = await login(signUpUser.username,"1234")
  expect(signUpUser).not.toBeNull()
  expect(token.token).not.toBeNull()
});