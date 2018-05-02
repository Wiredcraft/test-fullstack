import { combineReducers } from 'redux';
import NewsReducer from './news.reducer';
import AuthReducer from './auth.reducer';

const rootReducer = combineReducers({
    news: NewsReducer,
    auth: AuthReducer
});

export default rootReducer;
