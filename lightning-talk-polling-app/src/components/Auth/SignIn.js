import React, {Component} from 'react';
import {Auth} from 'aws-amplify';
import {withRouter} from 'react-router-dom';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import AuxiliaryComponent from "../../hoc/AuxiliaryComponent";
import Navbar from '../Navbar/Navbar';
import {connect} from 'react-redux';
import * as reduxActionTypes from '../../store/actions';

class SignIn extends Component {
    state = {
        username: '',
        password: '',
    };

    onChange = (key, value) => this.setState(() => {return {[key]: value}});

    signIn = () => {
        // const {history} = this.props;
        Auth.signIn(this.state.username, this.state.password)
            .then((response) => {
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
                <Button
                    text='Login'
                    cssClass='btn lime darken-4'
                    clicked={this.signIn}
                />
            </AuxiliaryComponent>
        );
    }
}

// Dispatch action
const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: (username) => dispatch({
            type: reduxActionTypes.AUTHENTICATE,
            username: username
        })
    }
}

export default withRouter(connect(null, mapDispatchToProps)(SignIn))