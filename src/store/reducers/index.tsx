import { combineReducers } from 'redux';


type ActionProps = {
  type: string,
  value: any
};


const talks = (state = {}, action: ActionProps) => {
  if (action.type === 'talks') {
    const data =  {
      ...state,
      ...action.value
    }

    return data;
  }

  return state;
};

const profile = (state = {}, action: ActionProps) => {
  if (action.type === 'profile') {
    const data =  {
      ...state,
      ...action.value
    }

    return data;
  }

  return state;
};


const rootReducer = combineReducers({
  talks,
  profile
});


export default rootReducer;
