import { combineReducers } from 'redux';
import TalksReducer from './talks.reducer';
import AuthReducer from './auth.reducer';
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    talks: TalksReducer,
    auth: AuthReducer,
    form: formReducer
});

export default rootReducer;
