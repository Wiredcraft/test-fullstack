import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {Auth} from 'aws-amplify';

import validate from '../../utililty/validate-input';
import AuxiliaryComponent from "../../hoc/AuxiliaryComponent";
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

class SignUp extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        phone_number: '',
        authCode: '',
        showConfirmation: false,
        isFormInitialState: true
    }

    // Listen to input fields changes
    onChange = (key, value) => {
        // Hand input value and key to validate utility methods. returns true of false
        const isInputValid = validate(key, value);

        // Don't show feedback messages when user just open route/page
        this.setState(() => {return {isFormInitialState: false}});

        // If input is valid show success message otherwise show error message
        if (isInputValid) {
            this.setState(() => {return {[key]: value}});
        } else {
            this.setState(() => {return {[key]: ''}});
        }
    };

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
                        label='Username *'
                        type='text'
                        placeholder='Username'
                        isValidInput={this.state.username}
                        validMessage='Username'
                        invalidMessage='Username: should contain only letters, number or both'
                        onChange={event => this.onChange('username', event.target.value)}
                    />
                    <Input
                        label='Your Password *'
                        type='password'
                        placeholder='Password'
                        isValidInput={this.state.password}
                        validMessage='Password'
                        invalidMessage='Password: should contain lowercase, uppercase, number, character, and at least length of 8'
                        onChange={event => this.onChange('password', event.target.value)}
                    />
                    <Input
                        label='Phone Number * (Format should be: +8613022121892. You will receive a message on your phone to finish registration)'
                        type='tel'
                        placeholder='+8613022121892'
                        isValidInput={this.state.phone_number}
                        validMessage='Phone number'
                        invalidMessage='Phone number: should have + sign, plus 13 digits, example, +8613022121892'
                        onChange={event => this.onChange('phone_number', event.target.value)}
                    />
                    <div className="text-center mt-4">
                        <Button
                            text='Register'
                            cssClass='btn orange darken-4'
                            clicked={this.signUp}
                        />
                        <Button
                            text='Already Registered!'
                            cssClass='btn orange darken-2'
                            clicked={() => {this.setState({showConfirmation : true})}}
                        />
                    </div>
                </AuxiliaryComponent>
                :
                <AuxiliaryComponent>
                    <Input
                        label='Confirmation Code (You will receive a 6-digits SMS message number on your phone)'
                        type='number'
                        placeholder='123456'
                        isValidInput={this.state.authCode}
                        validMessage='Confirmation code'
                        invalidMessage='Confirmation code: should be 6-digits. check your phone messages'
                        onChange={event => this.onChange('authCode', event.target.value)}
                    />
                    <div className="text-center mt-4">
                        <Button
                            text='Confirm Registration'
                            cssClass='btn orange darken-4'
                            clicked={this.confirmSignUp}
                        />
                        <Button
                            text='Resend Code'
                            cssClass='btn orange darken-2'
                            clicked={this.resendSignUp}
                        />
                    </div>
                </AuxiliaryComponent>
        );
    }
}

export default withRouter(SignUp);