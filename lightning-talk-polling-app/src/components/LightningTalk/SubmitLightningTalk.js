import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Amplify, {Auth, API} from 'aws-amplify';
import config from '../../aws-exports';
import Form from '../UI/Form/Form';
import Input from '../UI/Input/Input';
import Textarea from '../UI/Textarea/Textarea';
import Button from '../UI/Button/Button';

Amplify.configure(config);

class SubmitLightningTalk extends Component {
    state = {
        username: '',
        title: '',
        url: '',
        description: 'No description was provided for the video',
        points: 0,
    }

    componentDidMount() {
        // Get use's info
        Auth.currentAuthenticatedUser().then(user => this.setState({user}));
        Auth.currentUserInfo()
            .then(user => {
                this.setState({
                    username: user.username,
                });
            })
            .catch(error => console.log('Error retrieving user\' info: ', error));
    }

    onChange = (key, value) => {
        this.setState({
            [key]: value
        });
    }

    submitNewLightningTalk = async() => {
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
            <Form title='Submit a Lightning Talk'>
                <Input
                    label='Title'
                    type='text'
                    placeholder='Title'
                    maxLength='34'
                    required={true}
                    onChange={event => this.onChange('title', event.target.value)}
                />
                <Input
                    label='Youtube Video Link'
                    type='text'
                    placeholder='http://www.youtube.com/video'
                    onChange={event => this.onChange('url', event.target.value)}
                />
                <Textarea
                    label='Description'
                    placeholder='What is special about the video'
                    rows='4'
                    onChange={event => this.onChange('description', event.target.value)}
                />
                <Button
                    text='Submit Video'
                    cssClass='btn lime darken-4'
                    clicked={this.submitNewLightningTalk}
                />
            </Form>
        );
    }
}

export default withRouter(SubmitLightningTalk);