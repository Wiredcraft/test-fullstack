import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import styles from '../../less/login.less';
import { push } from 'react-router-redux';
import NetworkUtility from '../../utils/NetworkUtility';

// components
import Header from '../Header';

// actions
import RootActions from '../../actions/RootActions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this._onBackToIndexClick = this.onBackToIndexClick.bind(this);
        this._onSubmit = this.onSubmit.bind(this);
        this._onRegister = this.onRegister.bind(this);
    }

    onBackToIndexClick() {
        this.props.dispatch(push(NetworkUtility.baseURI() + '/home'));
    }

    onRegister() {
        this.props.dispatch(push(NetworkUtility.baseURI() + '/register'));
    }

    onSubmit() {
        const username = this.refs.username.value;
        const password = this.refs.password.value;
        if (username.length === 0 || password.length === 0) {
            alert('Please enter your username and password.');
            return;
        }
        this.props.dispatch(RootActions.Actions.submitLoginData({
            username,
            password
        }));
    }

    render() {
        return (
            <div className={styles.container}>
                <Header
                    logoText={'Lighting Talk'}
                    status={''}
                    onBackToIndex={this._onBackToIndexClick}
                    onRedirect={null}
                    />
                <div className={styles.content}>
                    <h1>Sign In</h1>
                    <label>Username</label>
                    <input ref="username" type="text"/>
                    <label>Password</label>
                    <input ref="password" type="password"/>
                    <button onClick={this._onSubmit}>Sign In</button>
                    <h5 onClick={this._onRegister}>Create a new account</h5>
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {
    app: PropTypes.object,
    dispatch: PropTypes.func
};

const componentState = ({root}) => ({
    app: root.get('app').toJS()
});

module.exports = connect(componentState)(LoginPage);