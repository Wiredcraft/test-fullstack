import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';

class Authenticator extends Component {
    state = {
        shouldSingUp: false
    }

    setSignUpState = (shouldSignUp) => {
        this.setState({
           shouldSignUp: shouldSignUp
        });
    }

    render() {
        const {shouldSignUp} = this.state;

        return (
            <div>
                {
                    shouldSignUp ? <SignUp/> : <SignIn/>
                }
                <p onClick={() => this.setSignUpState(true)}>Sign Up</p>
                <p onClick={() => this.setSignUpState(false)}>Sign In</p>
            </div>
        );
    }
}

export default withRouter(Authenticator);