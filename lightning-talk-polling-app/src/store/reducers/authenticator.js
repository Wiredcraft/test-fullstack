import * as actionTypes from '../actions/actions';

const initialState = {
    isUserAuthenticated: false,
    username: '',
    lightningTalkVideos: [],
    newPublishDate: 0
}

const reducer = (state = initialState, action) => {
    // Updating state immutably (...state) to avoid call by reference/value bugs
    switch (action.type) {
        case actionTypes.AUTHENTICATE:
            return {
                ...state,
                isUserAuthenticated: true,
                username: action.username
            };
        case actionTypes.SIGN_OUT:
            return {
                ...state,
                isUserAuthenticated: false,
                username: ''
            };
        case actionTypes.LIGHTNING_TALK_VIDEOS:
            return {
                ...state,
                newPublishDate: action.newPublishDate
            };
    }

    return state;
}

export default reducer;