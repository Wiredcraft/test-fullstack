import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ForgotPassword from './ForgotPassword';

class Authenticator extends Component {
    state = {
        shouldSingUp: 0
    }

    setSignUpState = (shouldSignUp) => {
        this.setState({
           shouldSignUp: shouldSignUp
        });
    }

    renderSwitch(param) {
        switch (param) {
            case 0:
                return <SignIn/>;
                break;
            case 1:
                return <SignUp/>;
                break;
            case 2:
                return <ForgotPassword/>;
                break;
            default:
                return <SignIn/>;
        }
    }

    render() {
        const {shouldSignUp} = this.state;

        return (
            <div>{this.renderSwitch(shouldSignUp)}
                <p onClick={() => this.setSignUpState(0)}>Sign In</p>
                <p onClick={() => this.setSignUpState(1)}>Sign Up</p>
                <p onClick={() => this.setSignUpState(2)}>Forgot Password</p>
            </div>
        );
    }
}

export default withRouter(Authenticator);