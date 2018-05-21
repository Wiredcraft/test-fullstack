import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {Auth} from 'aws-amplify';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import AuxiliaryComponent from "../../hoc/AuxiliaryComponent";

class SignUp extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        phone_number: '',
        authCode: '',
        showConfirmation: false
    }

    onChange = (key, value) => this.setState({[key]: value});

    signUp = () => {
        const { username, password, email, phone_number } = this.state;
        Auth.signUp({
            username,
            password,
            attributes: {
                email,
                phone_number
            }
        })
            .then(() => this.setState({ showConfirmation: true }))
            .catch(error => console.log('Error singing up: ', error));
    }

    confirmSignUp = () => {
        Auth.confirmSignUp(this.state.username, this.state.authCode)
            .then(() => this.props.history.push('/'))
            .catch(error => console.log('Error confirming signing up: ', error))
    }

    resendSignUp = () => {
        Auth.resendSignUp(this.state.username)
            .then(() => console.log('Verification code resent to user\'s phone'))
            .catch(error => console.log('Error resending verification code for signing up: ', error))
    }

    render() {
        const { showConfirmation } = this.state;
        return (
            !showConfirmation ?
                <AuxiliaryComponent>
                    <Input
                        label='*Usernam'
                        type='text'
                        placeholder='Username'
                        onChange={event => this.onChange('username', event.target.value)}
                    />
                    <Input
                        label='*Your Password'
                        type='password'
                        placeholder='Password'
                        onChange={event => this.onChange('password', event.target.value)}
                    />
                    <Input
                        label='*Confirm Your Password'
                        type='password'
                        placeholder='Password'
                        onChange={event => this.onChange('password', event.target.value)}
                    />
                    <Input
                        label='*Email'
                        type='email'
                        placeholder='Email'
                        onChange={event => this.onChange('email', event.target.value)}
                    />
                    <Input
                        label='*Phone Number (Format should be: +8613022121892. You will receive a message on your phone to finish registration)'
                        type='tel'
                        placeholder='+8613022121892'
                        onChange={event => this.onChange('phone_number', event.target.value)}
                    />
                    <Button
                        text='Register'
                        cssClass='btn btn-cyan'
                        clicked={this.signUp}
                    />
                    <Button
                        text='Already Registered!'
                        cssClass='btn btn-danger'
                        clicked={() => {this.setState({showConfirmation : true})}}
                    />

                </AuxiliaryComponent>
                :
                <AuxiliaryComponent>
                    <Input
                        label='Confirmation Code (You will receive a 6-digits SMS message number on your phone)'
                        type='number'
                        placeholder='123456'
                        onChange={event => this.onChange('authCode', event.target.value)}
                    />
                    <Button
                        text='Confirm Registration'
                        cssClass='btn btn-cyan'
                        clicked={this.confirmSignUp}
                    />
                    <Button
                        text='Resend Code'
                        cssClass='btn btn-danger'
                        clicked={this.resendSignUp}
                    />
                </AuxiliaryComponent>
        );
    }
}

export default withRouter(SignUp);