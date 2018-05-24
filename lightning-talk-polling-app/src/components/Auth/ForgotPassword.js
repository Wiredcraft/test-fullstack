import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {Auth} from 'aws-amplify';

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import AuxiliaryComponent from "../../hoc/AuxiliaryComponent";

class ForgotPassword extends Component {
    state = {
        username: '',
        password: '',
        authCode: '',
        showConfirmation: false
    }

    onChange = (key, value) => {
        console.log('key ' + key + ' value ' + value);
        this.setState({[key]: value});
        console.log(this.state.username);
    }

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
                        label='*Username'
                        type='text'
                        placeholder='Username'
                        onChange={event => this.onChange('username', event.target.value)}
                    />
                    <Input
                        label='*Your password'
                        type='password'
                        placeholder='Password'
                        onChange={event => this.onChange('password', event.target.value)}
                    />
                    <Input
                        label='*Confirm Your New Password'
                        type='password'
                        placeholder='Password'
                        onChange={event => this.onChange('password', event.target.value)}
                    />
                    <Input
                        label='Confirmation Code (You will receive a 6-digits SMS message number on your phone)'
                        type='number'
                        placeholder='123456'
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