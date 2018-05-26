import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Auth} from 'aws-amplify';

import * as reduxAction from '../../store/actions/actions';
import validate from '../../utililty/validate-input';
import AuxiliaryComponent from "../../hoc/AuxiliaryComponent";
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';

class SignIn extends Component {
    state = {
        username: '',
        password: '',
        isFormInitialState: true
    };

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

    signIn = () => {
        Auth.signIn(this.state.username, this.state.password)
            .then((response) => {
                // Update state in redux store
                this.props.onAuthenticate(response.username);
                this.props.history.push('/');
            })
            .catch(error => console.log('Error sing in: ', error));
    };

    render() {
        return (
            <AuxiliaryComponent>
                <Input
                    label='Username'
                    type='text'
                    placeholder='Username'
                    isValidInput={this.state.username}
                    validMessage='Username'
                    invalidMessage='Username: should contain only letters, number or both'
                    isFormInitialState={this.state.isFormInitialState}
                    onChange={event => this.onChange('username', event.target.value)}
                />
                <Input
                    label='Your password'
                    type='password'
                    placeholder='Password'
                    isValidInput={this.state.password}
                    validMessage='Password'
                    invalidMessage='Password: should contain lowercase, uppercase, number, character, and at least length of 8'
                    isFormInitialState={this.state.isFormInitialState}
                    onChange={event => this.onChange('password', event.target.value)}
                />
                <div className="text-center mt-4">
                    <Button
                        text='Login'
                        cssClass='text-center mt-4 btn orange darken-4'
                        clicked={this.signIn}
                    />
                </div>
            </AuxiliaryComponent>
        );
    }
}

export default withRouter(connect(null, reduxAction.mapDispatchToProps)(SignIn))