import * as actions from '../actions/toastActions'

const initialState = {
  showToast: false,
  message: null,
}

export default function toastReducer (state = initialState, action: any) {
  switch (action.type) {

    case actions.TOAST:
      return {
        ...state,
        ...action.params,
      }
  }

  return state
}
