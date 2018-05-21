import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ForgotPassword from './ForgotPassword';
import Form from '../UI/Form/Form';
import AuxiliaryComponent from "../../hoc/AuxiliaryComponent";

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
                return (
                    <Form title='Sign In'>
                        <SignIn/>
                        <hr className='mt-5' width="100%"/>
                        <div className='d-flex justify-content-between'>
                            <p onClick={() => this.setSignUpState(1)}>Sign Up</p>
                            <p onClick={() => this.setSignUpState(2)}>Forgot Password</p>
                        </div>
                    </Form>
                );
                break;
            case 1:
                return (
                    <Form title='Register'>
                        <SignUp/>
                        <hr className='mt-5' width="100%"/>
                        <div className='d-flex justify-content-between'>
                            <p onClick={() => this.setSignUpState(0)}>Sign In</p>
                            <p onClick={() => this.setSignUpState(2)}>Forgot Password</p>
                        </div>
                    </Form>
                );
                break;
            case 2:
                return (
                    <Form title='Forgot Password'>
                        <ForgotPassword/>
                        <hr className='mt-5' width="100%"/>
                        <div className='d-flex justify-content-between'>
                            <p onClick={() => this.setSignUpState(0)}>Sign In</p>
                            <p onClick={() => this.setSignUpState(1)}>Sign Up</p>
                        </div>
                    </Form>
                );
                break;
            default:
                return (
                    <Form title='Sign In'>
                        <SignIn/>
                        <hr className='mt-5' width="100%"/>
                        <div className='d-flex justify-content-between'>
                            <p onClick={() => this.setSignUpState(1)}>Sign Up</p>
                            <p onClick={() => this.setSignUpState(2)}>Forgot Password</p>
                        </div>
                    </Form>
                );
        }
    }

    render() {
        const {shouldSignUp} = this.state;

        return this.renderSwitch(shouldSignUp);
    }
}

export default withRouter(Authenticator);