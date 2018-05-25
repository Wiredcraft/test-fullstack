import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import Amplify, {API} from 'aws-amplify';

import * as reduxAction from "../../store/actions/actions";
import config from '../../aws-exports';
import apiGateway from "../../api-gateway-config";
import validate from "../../utililty/validate-input";
import Form from '../UI/Form/Form';
import Input from '../UI/Input/Input';
import Textarea from '../UI/Textarea/Textarea';
import Button from '../UI/Button/Button';

Amplify.configure(config);

class SubmitLightningTalk extends Component {
    state = {
        title: '',
        url: '',
        description: 'No description was provided for the video',
        points: 0,
        isFormInitialState: true
    }

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

    // Submit new video
    submitNewLightningTalk = () => {
        let lightningTalkVideo = {
            body: {
                ...this.state,
                username: this.props.username
            }
        }

        API.post(apiGateway.api_path, `/${apiGateway.path}`, lightningTalkVideo)
            .then(() => this.props.history.push('/'))
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
                    isValidInput={this.state.title}
                    validMessage='Title'
                    invalidMessage='Title'
                    onChange={event => this.onChange('title', event.target.value)}
                />
                <Input
                    label='Youtube Video Link'
                    type='text'
                    placeholder='http://www.youtube.com/video'
                    isValidInput={this.state.url}
                    validMessage='Youtube link'
                    invalidMessage='Youtube link'
                    onChange={event => this.onChange('url', event.target.value)}
                />
                <Textarea
                    label='Description'
                    placeholder='What is special about the video'
                    rows='4'
                    onChange={event => this.onChange('description', event.target.value)}
                />
                <div className="text-center mt-4">
                    <Button
                        text='Submit Video'
                        cssClass='btn orange darken-4'
                        clicked={this.submitNewLightningTalk}
                    />
                </div>
            </Form>
        );
    }
}

export default withRouter(connect(reduxAction.mapStateToProps)(SubmitLightningTalk));