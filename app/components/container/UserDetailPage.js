import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import styles from '../../less/user.less';
import { push } from 'react-router-redux';
import NetworkUtility from '../../utils/NetworkUtility';
// components
import Header from '../Header';
import LightingTalkList from '../LightingTalkList';

// actions
import RootActions from '../../actions/RootActions';

class UserDetailPage extends React.Component {
    constructor(props) {
        super(props);
        this._onBackToIndexClick = this.onBackToIndexClick.bind(this);
        this._onRedirectClick = this.onRedirectClick.bind(this);
        this._onPublishClick = this.onPublishClick.bind(this);
    }

    componentDidMount() {
        if (this.props.app.loggedUser.length > 0) {
            this.props.dispatch(RootActions.Actions.fetchMyTalkList(this.props.app.loggedUserId));
        } else {
            this.props.dispatch(push(NetworkUtility.baseURI() + '/signin'));
        }
    }

    onRedirectClick() {
        this.props.dispatch(push(NetworkUtility.baseURI() + '/user/info'));
    }

    onBackToIndexClick() {
        this.props.dispatch(push(NetworkUtility.baseURI() + '/home'));
    }

    onPublishClick() {
        this.props.dispatch(push(NetworkUtility.baseURI() + '/publish'));
    }

    render() {
        return (
            <div className={styles.container}>
                <Header
                    logoText={'Lighting Talk'}
                    status={this.props.app.loggedStatus}
                    onBackToIndex={this._onBackToIndexClick}
                    onRedirect={this._onRedirectClick}
                    />
                <div className={styles.content}>
                    <div className={styles.content}>
                        <button onClick={this._onPublishClick}>Publish New Talk</button>
                        <h1>My Talks</h1>
                        <LightingTalkList talks={this.props.app.myTalks} onVoteTalk={null}/>
                    </div>
                </div>
            </div>
        );
    }
}

UserDetailPage.propTypes = {
    app: PropTypes.object,
    dispatch: PropTypes.func
};

const componentState = ({root}) => ({
    app: root.get('app').toJS()
});

module.exports = connect(componentState)(UserDetailPage);