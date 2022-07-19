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
    id: CONSTANTS?.INPUT_ID?.CONFIRMATION_CODE,
    label: 'Confirmation Code',
    placeholder: 'Code',
    type: 'number',
    errorMessage: 'Enter valid 6-digit code',
  },
]
