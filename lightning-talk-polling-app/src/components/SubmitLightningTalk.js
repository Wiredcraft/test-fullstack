import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import Amplify, {Auth, API} from 'aws-amplify';
import config from '../aws-exports';

Amplify.configure(config);

class SubmitLightningTalk extends Component {
    render() {
        return (
            <div>
                <h1>Submit a lightning talk</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        Auth.signOut()
                            .then(() => {this.props.history.push('/authenticate')})
                            .catch(error => console.log('Error signing out: ', error));
                    }}
                >
                    Sign out
                </button>
            </div>
        );
    }
}

export default withRouter(SubmitLightningTalk);