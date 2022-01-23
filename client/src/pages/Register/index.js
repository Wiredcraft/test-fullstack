import { Auth, Form, Panel } from 'Components';
import React from 'react';
import { withRouter } from 'react-router-dom';
import Utils from 'Utils';
import styles from './style.module.less';

class Register extends React.Component {
    static contextType = Auth.Context;

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
        name: [
            { validator: 'required' },
        ],
        password: [
            { validator: 'required' }
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
                return app.service.register(this.state.values)
            })
            .then(body => {
                this.setState({ loading: false });
                const { name, token } = body;
                app.storage.set('user', { name });
                app.storage.set('authToken', token);
                this.context.notifyUserChange();
                this.props.history.push("/");
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
            <Panel className={styles.registerPanel} title="Register">
                <Form className={styles.registerForm} {...this.state}>
                    <Form.Item label="Name">
                        <input field="name" />
                    </Form.Item>
                    <Form.Item label="Password">
                        <input field="password" type="password" />
                    </Form.Item>
                    <Form.Item>
                        <button type="primary" onClick={this.onSubmit}>register</button>
                    </Form.Item>
                </Form>
            </Panel>
        )
    }
}

export default withRouter(Register);