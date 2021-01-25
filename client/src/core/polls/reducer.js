import * as TYPES from '../constants';
import { getListWithItem, getItemById } from '../helpers';

export const initialState = {
  all: {
    loading: false, error: null, polls: null
  },
  active: {
    loading: false, error: null, message: null, poll: null
  },
};


export function pollReducer(state = initialState, action = {}) {
  let payload, polls, error;

  if (!action.type) action.type = '';
  if (!action.payload) action.payload = {};
  payload = action.payload;

  switch(action.type) {

    case TYPES.GET_POLLS:
      return {
        all: {
          loading: true, error: null, polls: null
        }, ...state
      };

    case TYPES.GET_POLLS_SUCCESS:
      polls = payload.polls || null;
      return {
        all: {
          loading: true, error: null, polls
        }, 
        active: {
          loading: false, error: null, message: null, poll: null
        }
      };

    case TYPES.GET_POLLS_FAILURE:
      error = payload.error || 'An error occured';
      return {
        all: {
          loading: false, polls: null, error
        }, 
        active: {
          loading: false, error: null, message: null, poll: null
        }
      };

    case TYPES.POST_POLL:
      return {
        active: {
          loading: true, error: null, poll: null,
          message: 'Creating poll...'
        }, ...state
      };

    case TYPES.POST_POLL_SUCCESS:
      // TODO 
      // check result
      poll = payload.poll || null;
      message = payload.message || null;
      // polls = poll;
      return {
        all: {
          loading: false, error: null, polls: getListWithItem(state.all.polls, poll)
        }, 
        active: {
          loading: false, error: null, message: null, poll: null
        }
      };
    
    case TYPES.POST_POLL_FAILURE:
      error = payload.error || 'An error occured';
      return {
        active: {
          loading: false, message: null, poll: null, error
        }, ...state
      };

    case TYPES.UPDATE_POLL_VOTE:
      return {
        active: {
          loading: true, error: null, poll: null,
          message: 'Updating vote...'
        }, ...state
      };

    default:
      return state;
  }
};
