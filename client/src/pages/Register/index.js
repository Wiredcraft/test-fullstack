import React from 'react';
import { Form, Panel } from 'Components';
import styles from './style.module.less';

export default class extends React.Component {
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

    onSubmit = () => {
        app.service.register(this.state.values)
            .then(body => {

            })
            .catch(error => {

            })
    }

    render() {
        return (
            <Panel title="Register">
                <Form className={styles.registerPanel} {...this.state}>
                    <Form.Item label="email">
                        <input field="email" />
                    </Form.Item>
                    <Form.Item label="password">
                        <input field="password" />
                    </Form.Item>
                    <Form.Item>
                        <button type="primary" onClick={this.onSubmit}>register</button>
                    </Form.Item>
                </Form>
            </Panel>
        )
    }
}