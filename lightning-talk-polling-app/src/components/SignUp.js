import React, {Component} from 'react';
import {Auth} from 'aws-amplify';
import AuxiliaryComponent from '../hoc/AuxiliaryComponent';

class SignUp extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        phone_number: '',
        authCode: ''
    }

    onChange = (key, value) => {
        this.setState({
            [key]: value
        });
    }

    signUp = () => {
        const {username, password, email, phone_number} = this.state;
        Auth.signUp({
            username,
            password,
            attributes: {
                email,
                phone_number
            }
        })
            .then(() => console.log('Waiting for confirmation to join LIGHT NINNNNNG'))
            .catch(error => console.log('Error singing up: ', error));
    }

    confirmSignUp = () => {
        Auth.confirmSignUp(this.state.username, this.state.authCode)
            .then(() => console.log('Registration confirmed! welcome to LIGHT NINNNNNG'))
            .catch(error => console.log('Error confirming registration: ', error));
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default SignUp;