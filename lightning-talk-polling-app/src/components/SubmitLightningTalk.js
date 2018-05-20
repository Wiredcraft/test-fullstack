import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import Amplify, {Auth, API} from 'aws-amplify';
import config from '../aws-exports';

Amplify.configure(config);

class SubmitLightningTalk extends Component {
    state = {
        username: '',
        title: '',
        url: '',
        description: ''
    }

    componentDidMount() {
        // Get use's info
        Auth.currentAuthenticatedUser().then(user => this.setState({user}));
        Auth.currentUserInfo()
            .then(user => {
                this.setState({username: user.username});
            })
            .catch(error => console.log('Error retrieving user\' info: ', error));
    }

    onChange = (key, value) => {
        this.setState({
            [key]: value
        });
    }

    submitNewLightningTalk = async() => {
        // todo: Validate input
        let apiName = 'lightning-talk-pollingCRUD';
        let path = '/lightning-talk-polling';
        let talkData = {
            body: {
                ...this.state
            }
        }
        API.post(apiName, path, talkData)
            .then(msg => {
                this.props.history.push('/');
                console.log('Submitted successfully: ', msg);
            })
            .catch(error => console.log('Error submitting: ', error));
    }


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

                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        onChange={event => this.onChange('title', event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Video Link</label>
                    <input
                        type="url"
                        className="form-control"
                        placeholder="http://www.website.com/video"
                        onChange={event => this.onChange('url', event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input type="text"
                           className="form-control"
                           placeholder="What does the video talks about?"
                           onChange={event => this.onChange('description', event.target.value)}
                    />
                </div>
                <button
                    className="btn btn-success"
                    onClick={this.submitNewLightningTalk}
                >
                    Submit Talk
                </button>
            </div>
        );
    }
}

export default withRouter(SubmitLightningTalk);