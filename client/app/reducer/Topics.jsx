import mirror from '../util/mirror';

const initialState = {
  error: false,
  loading: false,
  topics: [{
    id: '2323',
    points: 12,
    title: 'Test fdfddf',
    date: new Date('2012.08.10').getTime() / 1000,
    liked: true,
    author: 'theotow',
    authorId: 'useridfdfd'
  },
  {
    id: '232',
    points: 15,
    title: 'Test fdfddf',
    date: new Date('2012.08.10').getTime() / 1000,
    liked: false,
    author: 'theotow2',
    authorId: 'userid'
  }]
}

export const TopicConst = mirror([
  'GET_LIST',
  'ERROR_LIST',
  'LOADING_LIST'
])

export function Reducer(state = initialState, action) {
  switch (action.type) {
    case TopicConst.GET_LIST:
      return {
        error: false,
        loading: false,
        topics: payload.topics
      };
    case TopicConst.SET_LIST:
      return {
        error: false,
        loading: false,
        topics: payload.topics
      };
    case TopicConst.ERROR_LIST:
      return {
        haha : action.payload
      };
    case TopicConst.LOADING_LIST:
      return {
        haha : action.payload
      };
    default:
      return state;
    }
};
