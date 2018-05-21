import React, {Component} from 'react';
import {Auth} from 'aws-amplify';
import {withRouter} from 'react-router-dom';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import AuxiliaryComponent from "../../hoc/AuxiliaryComponent";

class SignIn extends Component {
    state = {
        username: '',
        password: '',
        authCode: '',
        user: {},
    };

    onChange = (key, value) => this.setState({[key]: value});

    signIn = () => {
        const {history} = this.props;
        Auth.signIn(this.state.username, this.state.password)
            .then(() => history.push('/'))
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
                    cssClass='btn btn-cyan'
                    clicked={this.signIn}
                />
            </AuxiliaryComponent>
        );
    }
}

export default withRouter(SignIn);