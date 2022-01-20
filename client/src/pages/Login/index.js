import React from 'react';
import styles from './style.module.less';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            values: {},
            errors: {},
            onValuesChange: (values) => {
                this.setState({
                    ...this.state.values,
                    ...values
                })
            }
        }
    }

    onSubmit = () => {
        app.service.login(this.state.values)
            .then(body => {

            })
            .catch(error => {

            })
    }

    render() {
        return (
            <Panel title="登录" className={styles.loginPanel}>
                <Form className={styles.login}>
                    <Form.Item label="邮箱">
                        <input field="email" />
                    </Form.Item>
                    <Form.Item label="密码">
                        <input field="password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={this.onSubmit}>登录</Button>
                        <a className={styles.tip} href="/reset">忘记密码？</a>
                    </Form.Item>
                </Form>
            </Panel>
        )
    }
}