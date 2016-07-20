import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import styles from '../../less/home.less';
import { push } from 'react-router-redux';
import NetworkUtility from '../../utils/NetworkUtility';

// components
import Header from '../Header';
import LightingTalkList from '../LightingTalkList';

// actions
import RootActions from '../../actions/RootActions';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this._onBackToIndexClick = this.onBackToIndexClick.bind(this);
        this._onRedirectClick = this.onRedirectClick.bind(this);
        this._onVoteTalk = this.onVoteTalk.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(RootActions.Actions.fetchTalkList());
    }

    onBackToIndexClick() {
        this.props.dispatch(push(NetworkUtility.baseURI() + '/home'));
    }

    onRedirectClick() {
        if (this.props.app.loggedUser.length > 0) {
            this.props.dispatch(push(NetworkUtility.baseURI() + '/user/info'));
        } else {
            this.props.dispatch(push(NetworkUtility.baseURI() + '/signin'));
        }
    }

    onVoteTalk(talkId) {
        if (this.props.app.loggedUser.length > 0) {
            this.props.dispatch(RootActions.Actions.voteToTalk({
                publisherId: this.props.app.loggedUserId,
                talkId
            }));
        } else {
            alert('You need to sign in first and able to vote to the talk.');
            this.props.dispatch(push(NetworkUtility.baseURI() + '/signin'));
        }
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
                    <h1>Most Popular Talks</h1>
                    <LightingTalkList talks={this.props.app.talks} onVoteTalk={this._onVoteTalk}/>
                </div>
            </div>
        );
    }
}

HomePage.propTypes = {
    app: PropTypes.object,
    dispatch: PropTypes.func
};

const componentState = ({root}) => ({
    app: root.get('app').toJS()
});

module.exports = connect(componentState)(HomePage);
