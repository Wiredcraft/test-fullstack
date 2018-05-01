import { combineReducers } from 'redux';
import NewsReducer from './news.reducer';

const rootReducer = combineReducers({
    news: NewsReducer
});

export default rootReducer;
