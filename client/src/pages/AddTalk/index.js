import { Form, Panel } from 'Components';
import React from 'react';
import Utils from 'Utils';
import { withRouter } from 'react-router-dom';
import styles from './style.module.less';

class AddTalk extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            values: {},
            errors: {},
            onValuesChange: (values) => {
                this.setState({
                    values: {
                        ...this.state.values,
                        ...values
                    }
                })
            }
        }
    }

    rules = {
        title: [
            { validator: 'required' },
        ],
        description: [
            { validator: 'required' },
            { validator: 'length', options: { min: 10, max: 100 }}
        ],
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        if (this.state.loading) {
            return;
        }

        this.setState({ loading: true, errors: {} });
        Utils.validator(this.rules)(this.state.values)
            .then(() => {
                return app.service.addTalk(this.state.values)
            })
            .then(body => {
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
                if (error.name == 'ValidationError') {
                    this.setState({
                        errors: error.data
                    })
                } else {
                    throw error;
                }
            })
    }

    render() {
        return (
            <Panel className={styles.addTalkPanel} title="Add Talk">
                <Form className={styles.addTalkForm} {...this.state}>
                    <Form.Item label="Title">
                        <input field="title" />
                    </Form.Item>
                    <Form.Item label="Description">
                        <textarea field="description" rows={10} />
                    </Form.Item>
                    <Form.Item>
                        <button type="primary" onClick={this.onSubmit}>submit</button>
                    </Form.Item>
                </Form>
            </Panel>
        )
    }
}

export default withRouter(AddTalk);