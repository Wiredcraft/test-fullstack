// Action name
export const AUTHENTICATE = 'AUTHENTICATE';
export const SIGN_OUT = 'SIGN_OUT';

// Component receive state
export const mapStateToProps = state => {
    return {
        isUserAuthenticated: state.isUserAuthenticated,
        username: state.username
    }
}

// Component dispatch action
export const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: (username) => dispatch({
            type: AUTHENTICATE,
            username: username
        }),
        onSignOut: () => dispatch({type: SIGN_OUT})
    }
}

