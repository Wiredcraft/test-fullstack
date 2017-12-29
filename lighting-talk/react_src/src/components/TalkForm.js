import React, {Component} from 'react';
import { Form } from 'semantic-ui-react';
import axios from 'axios';

class TalkForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            item: props.talk,
            action: props.action,
            title: "",
            description: "",
            username: ""
        }
    }
    onSubmit(e) {
        const talk = {
            title: this.state.title,
            description: this.state.description,
            username: this.state.username
        }
        this.addTalk(talk);
        e.preventDefault();   
    }

    addTalk(talk) {
        axios.request({
            method: 'post',
            url: this.state.action,
            data: talk
        })
        .then(response =>{
            this.props.callback(
                {type: 'success',
                header: 'A new talk - ' + this.state.title + ' has been created'
                });
        })
        .catch(err => {
            this.props.callback(
                {type: 'negative',
                header: 'Creation unsuccessful',
                content: err
                });
        });
    }

    formValueChanged = (e, {name, value}) => this.setState({[name] : value})

    render(){
        return (
            <div>
                <Form onSubmit={this.onSubmit.bind(this)} >
                <Form.Input name='title' label='Title' placeholder='Title' required onChange={this.formValueChanged} />
                <Form.TextArea name='description' label='Description' placeholder='Tell us more about the talk...' onChange={this.formValueChanged} />
                <Form.Input name='username' label='Name' placeholder='Tell us who you are!' required onChange={this.formValueChanged} />
                <Form.Button>Submit</Form.Button>
              </Form>
            </div>
        )
    }
}

export default TalkForm;