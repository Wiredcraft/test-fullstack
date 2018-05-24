import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Auth} from 'aws-amplify';

import * as reduxAction from '../../store/actions/actions';
import AuxiliaryComponent from "../../hoc/AuxiliaryComponent";
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';


class SignIn extends Component {
    state = {
        username: '',
        password: '',
    };

    // Listen to input fields changes
    onChange = (key, value) => this.setState(() => {return {[key]: value}});

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
                    onChange={event => this.onChange('username', event.target.value)}
                />
                <Input
                    label='Your password'
                    type='password'
                    placeholder='Password'
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