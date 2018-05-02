import { combineReducers } from 'redux';
import TalksReducer from './talks.reducer';
import AuthReducer from './auth.reducer';

const rootReducer = combineReducers({
    talks: TalksReducer,
    auth: AuthReducer
});

export default rootReducer;
