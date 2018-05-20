import React, {Component} from 'react';
import {Auth} from 'aws-amplify';
import {withRouter} from 'react-router-dom';

class SignIn extends Component {
    state = {
        username: '',
        password: '',
        authCode: '',
        user: {},
        showConfirmation: false
    }

    onChange = (key, value) => {
        this.setState({[key]: value});
    }

    signIn = () => {
        const {history} = this.props;
        Auth.signIn(this.state.username, this.state.password)
            .then(user => {
                this.setState({ user, showConfirmation: true });
                history.push('/');

            })
            .catch(error => console.log('Error sing in: ', error));
    }

    render() {
        return (
            <section className="form-elegant mt-5">
                <div className="card">
                    <div className="card-body mx-4">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-6 text-left">
                                <p className="h4 text-center mb-4">{this.props.title}</p>
                                <label for="defaultFormLoginEmailEx" className="grey-text ">Username</label>
                                <input
                                    id="defaultFormLoginEmailEx"
                                    type="username"
                                    className="form-control"
                                    placeholder="Username"
                                    onChange={event => this.onChange('username', event.target.value)}
                                />
                                <br/>
                                <label for="defaultFormLoginPasswordEx" className="grey-text">Your password</label>
                                <input
                                    id="defaultFormLoginPasswordEx"
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={event => this.onChange('password', event.target.value)}
                                />
                                <div className="text-center mt-4">
                                    <button
                                        className="btn btn-cyan"
                                        onClick={this.signIn}
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default withRouter(SignIn);