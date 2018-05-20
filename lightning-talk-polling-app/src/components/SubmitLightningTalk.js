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
        description: '',
        points: 0
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
            <section className="form-elegant mt-5 container">
                <div className="card">
                    <div className="card-body mx-4">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-6 text-left">
                                <p className="h4 text-center mb-4">Submit a Lightning Talk</p>
                                <label for="defaultFormLoginEmailEx" className="grey-text ">Title</label>
                                <input
                                    id="defaultFormLoginEmailEx"
                                    type="text"
                                    className="form-control"
                                    placeholder="Title"
                                    onChange={event => this.onChange('title', event.target.value)}
                                />
                                <br/>
                                <label for="defaultFormLoginPasswordEx" className="grey-text">Video's Link</label>
                                <input
                                    id="defaultFormLoginPasswordEx"
                                    type="url"
                                    className="form-control"
                                    placeholder="http://www.youtube.com/video"
                                    onChange={event => this.onChange('url', event.target.value)}
                                />
                                <br/>
                                <label for="defaultFormContactMessageEx" className="grey-text">Description</label>
                                <textarea
                                    id="defaultFormContactMessageEx"
                                    className="form-control"
                                    rows="3"
                                    onChange={event => this.onChange('description', event.target.value)}
                                />
                                <div className="text-center mt-4">
                                    <button
                                        className="btn btn-cyan"
                                        onClick={this.submitNewLightningTalk}
                                    >
                                        Submit Video
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

export default withRouter(SubmitLightningTalk);