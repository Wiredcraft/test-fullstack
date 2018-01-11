import {ADD_TALK_SUCCESS, ADD_TALK_FAIL, addTalk} from './talks'

export const CHANGE_FIELD = 'CHANGE_FIELD'
export const changeField = (field, value) => {
  return {
    type: CHANGE_FIELD,
    field,
    value,
  }
}

export const submitBox = () => {
  return (dispatch, getState) => {
    const {talkBox} = getState()
    const violations = validateAll(talkBox)

    if (Object.keys(violations).length === 0) {
      dispatch(addTalk({
        author: talkBox.author.value,
        title: talkBox.title.value,
        description: talkBox.description.value,
      }))
    } else {
      dispatch({
        type: ADD_TALK_FAIL,
        violations,
      })
    }
  }
}

const validationRules = {
  author: {
    required: true,
    maxLength: 19,
  },
  title: {
    required: true,
    maxLength: 59,
  },
  description: {
    required: true,
    maxLength: 599,
  },
}
const validate = (field, value) => {
  const {required, maxLength} = validationRules[field]
  let violation = ''

  if (required && !value) {
    violation = 'Please fill out the field.'
  } else if (maxLength < value.length) {
    violation = `Exceed words limit by ${value.length - maxLength}.`
  }

  return violation
}
const validateAll = (state) => {
  const violations = {}

  Object.keys(state).forEach(field => {
    const value = state[field].value
    const violation = validate(field, value)

    if (violation) {
      violations[field] = violation
    }
  })

  return violations
}

const initialState = {
  author: {
    value: '',
    violation: '',
  },
  title: {
    value: '',
    violation: '',
  },
  description: {
    value: '',
    violation: '',
  }
}
const talkBox = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FIELD:
      return {
        ...state,
        [action.field]: {
          value: action.value,
          violation: validate(action.field, action.value),
        }
      }
    case ADD_TALK_SUCCESS:
      return initialState
    case ADD_TALK_FAIL:
      return action.violations ?
        Object.keys(state).reduce((newState, field) => {
          return {
            ...newState,
            [field]: {
              value: state[field].value,
              violation: action.violations[field] || '',
            },
          }
        }, {})
        : state
    default:
      return state
  }
}

export default talkBox
