import * as actionTypes from '../actions';

const initialState = {
    isUserAuthenticated: false,
    username: 'Guest'
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
                username: 'Guest'
            };
    }

    return state;
}

export default reducer;