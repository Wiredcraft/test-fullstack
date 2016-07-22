import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import styles from '../../less/login.less';
import { push } from 'react-router-redux';
import NetworkUtility from '../../utils/NetworkUtility';

// components
import Header from '../Header';

// actions
import RootActions from '../../actions/RootActions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this._onBackToIndexClick = this.onBackToIndexClick.bind(this);
        this._onSubmit = this.onSubmit.bind(this);
        this._onRedirectClick = this.onRedirectClick.bind(this);
    }

    onBackToIndexClick() {
        this.props.dispatch(push(NetworkUtility.baseURI() + '/home'));
    }

    onRedirectClick() {
        this.props.dispatch(push(NetworkUtility.baseURI() + '/signin'));
    }

    onSubmit() {
        const username = this.refs.username.value;
        const password = this.refs.password.value;
        const confirmPassword = this.refs.confirmPassword.value;
        if (username.length === 0 || password.length === 0 || confirmPassword.length === 0) {
            alert('Please fill the blank.');
            return;
        }
        if (password !== confirmPassword) {
            alert('The password is not match. Please check your password');
            return;
        }
        this.props.dispatch(RootActions.Actions.submitRegisterData({
            username,
            password,
            confirmPassword
        }));
    }

    render() {
        return (
            <div className={styles.container}>
                <Header
                    logoText={'Lighting Talks'}
                    status={'Sign In'}
                    onBackToIndex={this._onBackToIndexClick}
                    onRedirect={this._onRedirectClick}
                    />
                <div className={styles.content}>
                    <h1>Create a new account</h1>
                    <label>Username</label>
                    <input ref="username" type="text"/>
                    <label>Password</label>
                    <input ref="password" type="password"/>
                    <label>Confirm Password</label>
                    <input ref="confirmPassword" type="password"/>
                    <button onClick={this._onSubmit}>Sign Up</button>
                </div>
            </div>
        );
    }
}

RegisterPage.propTypes = {
    app: PropTypes.object,
    dispatch: PropTypes.func
};

const componentState = ({root}) => ({
    app: root.get('app').toJS()
});

module.exports = connect(componentState)(RegisterPage);