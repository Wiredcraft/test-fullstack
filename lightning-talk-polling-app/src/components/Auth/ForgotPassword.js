import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {Auth} from 'aws-amplify';

import validate from '../../utililty/validate-input';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import AuxiliaryComponent from "../../hoc/AuxiliaryComponent";

class ForgotPassword extends Component {
    state = {
        username: '',
        password: '',
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

    forgotPassword = () => {
        Auth.forgotPassword(this.state.username)
            .then(() => {this.setState(() => {return {showConfirmation: true}})})
            .catch(error => console.log('Error forgot password: ', error));
    }

    forgotPasswordSubmit = () => {
        Auth.forgotPasswordSubmit(this.state.username, this.state.authCode, this.state.password)
            .then(() => this.props.history.push('/'))
            .catch(error => console.log('Error setting new password: ', error))
    }

    render() {
        const {showConfirmation} = this.state;
        return (
            !showConfirmation ?
                <AuxiliaryComponent>
                    <Input
                        label='Username'
                        type='text'
                        placeholder='Username'
                        isValidInput={this.state.username}
                        validMessage='Username'
                        invalidMessage='Username: should contain only letters, number or both'
                        onChange={event => this.onChange('username', event.target.value)}
                    />
                    <Button
                        text='Get New Password'
                        cssClass='btn orange darken-4'
                        clicked={this.forgotPassword}
                    />
                </AuxiliaryComponent>
                :
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
                        label='Type a new password *'
                        type='password'
                        placeholder='Password'
                        isValidInput={this.state.password}
                        validMessage='Password'
                        invalidMessage='Password: should contain lowercase, uppercase, number, character, and at least length of 8'
                        onChange={event => this.onChange('password', event.target.value)}
                    />
                    <Input
                        label='Confirmation Code (You will receive a 6-digits SMS message number on your phone)'
                        type='number'
                        placeholder='123456'
                        isValidInput={this.state.authCode}
                        validMessage='Confirmation code'
                        invalidMessage='Confirmation code: should be 6-digits. check your phone messages'
                        onChange={event => this.onChange('authCode', event.target.value)}
                    />
                    <Button
                        text='Submit'
                        cssClass='btn orange darken-4'
                        clicked={this.forgotPasswordSubmit}
                    />
                </AuxiliaryComponent>
        );
    }
}

export default withRouter(ForgotPassword);