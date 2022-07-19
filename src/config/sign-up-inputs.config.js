import CONSTANTS from 'constants'

export default [
  {
    id: CONSTANTS?.INPUT_ID?.USERNAME,
    label: 'Username',
    placeholder: 'Username',
    type: 'text',
    errorMessage: 'Enter username, 3 characters minimum',
  },
  {
    id: CONSTANTS?.INPUT_ID?.EMAIL,
    label: 'Email',
    placeholder: 'Email',
    type: 'email',
    errorMessage: 'Enter a valid email',
  },
  {
    id: CONSTANTS?.INPUT_ID?.PASSWORD,
    label: 'Password',
    placeholder: 'Password',
    type: 'password',
    errorMessage: 'Enter password, minimum 8 characters',
  },
]
