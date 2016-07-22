import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import styles from '../../less/publish.less';
import { push } from 'react-router-redux';
import NetworkUtility from '../../utils/NetworkUtility';

// components
import Header from '../Header';

// actions
import RootActions from '../../actions/RootActions';

class TalkPublishPage extends React.Component {
    constructor(props) {
        super(props);
        this._onBackToIndexClick = this.onBackToIndexClick.bind(this);
        this._onRedirectClick = this.onRedirectClick.bind(this);
        this._onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.app.loggedUser.length === 0) {
            this.props.dispatch(push(NetworkUtility.baseURI() + '/signin'));
        }
    }

    onRedirectClick() {
        this.props.dispatch(push(NetworkUtility.baseURI() + '/user/info'));
    }

    onBackToIndexClick() {
        this.props.dispatch(push(NetworkUtility.baseURI() + '/home'));
    }

    onSubmit() {
        const title = this.refs.title.value;
        const speaker = this.refs.speaker.value;
        const description = this.refs.description.value;
        const coverURL = this.refs.coverURL.value;
        const talkURL = this.refs.url.value;
        if (title.length === 0 || speaker.length === 0 ||
            description.length === 0 || coverURL.length === 0 ||
            talkURL.length === 0) {
            alert('Please fill the all blanks.');
            return;
        }
        this.props.dispatch(RootActions.Actions.submitPublishData({
            publisherId: this.props.app.loggedUserId,
            title,
            speaker,
            description,
            coverURL,
            talkURL
        }));
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
                        <h1>Publish a New Lighting Talk</h1>
                        <label>Title</label>
                        <input ref="title" type="text"/>
                        <label>Speaker</label>
                        <input ref="speaker" type="text"/>
                        <label>Description</label>
                        <textarea ref="description" rows="3"></textarea>
                        <label>Cover URL</label>
                        <input ref="coverURL" type="text"/>
                        <label>Talk URL</label>
                        <input ref="url" type="text"/>

                        <button onClick={this._onSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

TalkPublishPage.propTypes = {
    app: PropTypes.object,
    dispatch: PropTypes.func
};

const componentState = ({root}) => ({
    app: root.get('app').toJS()
});

module.exports = connect(componentState)(TalkPublishPage);