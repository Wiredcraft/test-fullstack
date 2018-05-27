// Action name
export const AUTHENTICATE = 'AUTHENTICATE';
export const SIGN_OUT = 'SIGN_OUT';
export const LIGHTNING_TALK_VIDEOS = 'LIGHTNING_TALK_VIDEOS';

// Component receive state
export const mapStateToProps = state => {
    return {
        isUserAuthenticated: state.isUserAuthenticated,
        username: state.username,
        lightningTalkVideos: state.lightningTalkVideos,
        newPublishDate: state.newPublishDate
    }
}

// Component dispatch action
export const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: (username) => dispatch({
            type: AUTHENTICATE,
            username: username
        }),
        onSignOut: () => dispatch({
            type: SIGN_OUT
        }),
        onNewVideoPublished: (newPublishDate) => dispatch({
            type: LIGHTNING_TALK_VIDEOS,
            newPublishDate: newPublishDate
        }),
    }
}

