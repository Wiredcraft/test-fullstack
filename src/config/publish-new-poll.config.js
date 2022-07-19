import CONSTANTS from 'constants'

export default [
  {
    id: CONSTANTS?.INPUT_ID?.TITLE,
    label: 'Title',
    placeholder: 'Title',
    type: 'text',
    errorMessage: 'Enter title, between 10 and 50 characters',
  },
  {
    id: CONSTANTS?.INPUT_ID?.DESCRIPTION,
    label: 'Description',
    placeholder: 'Enter a short description...',
    type: 'textarea',
    errorMessage: 'Enter description, between 10 and 150 characters',
  },
]
