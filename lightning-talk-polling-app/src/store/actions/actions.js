// Action name
export const AUTHENTICATE = 'AUTHENTICATE';
export const SIGN_OUT = 'SIGN_OUT';
export const LIGHTNING_TALK_VIDEOS = 'LIGHTNING_TALK_VIDEOS';
export const NEW_VIDEO_PUBLISH_DATE = 'NEW_VIDEO_PUBLISH_DATE';


// Component receive state
export const mapStateToProps = state => {
    return {
        isUserAuthenticated: state.isUserAuthenticated,
        username: state.username,
        lightningTalkVideos: state.lightningTalkVideos,
        newVideoPublishDate: state.newVideoPublishDate
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
        onNewVideoPublished: (newVideoPublishDate) => dispatch({
            type: NEW_VIDEO_PUBLISH_DATE,
            newVideoPublishDate: newVideoPublishDate
        }),
        onNewVideoDownloaded: (lightningTalkVideos) => dispatch({
            type: LIGHTNING_TALK_VIDEOS,
            lightningTalkVideos: lightningTalkVideos
        }),
    }
}

