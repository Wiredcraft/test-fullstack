import React from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import Panel from '../../components/panel';
import Form, { Button } from '../../components/form';
import util from '../../util';
import styles from './style.less';

class Reset extends React.Component {
    static async getInitialProps(ctx) {
        return {
            layout: await Layout.getInitialProps(ctx)
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            data: {
                email: '',
                password: '',
                code: ''
            },
            error: {}
        }
    }

    onInputChange = type => {
        return e => {
            this.setState({
                data: {
                    ...this.state.data,
                    [type]: e.target.value
                }
            })
        }
    }

    onSubmit = e => {
        this.setState({ error: {} });
        util.request.post('/api/reset', this.state.data)
            .then(body => {
                window.dispatchEvent(new CustomEvent('appmessage', { detail: { message: '重置密码成功，即将跳转到登录页面' } }));
                setTimeout(() => {
                    location.href = "/login";
                }, 3000);
            })
            .catch(err => {
                if (err.name == 'ValidationError') {
                    this.setState({ error: err.data });
                }
            });
    }

    onSend = e => {
        if (this.state.timeout) {
            return;
        }

        this.setState({ error: {} });
        util.request.post('/api/verify', { email: this.state.data.email })
            .then(body => {
                this.setState({ timeout: 60 });
                this.timer = setInterval(() => {
                    if (this.state.timeout > 0) {
                        this.setState({
                            timeout: this.state.timeout - 1
                        });
                    } else {
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000);
            })
            .catch(err => {
                if (err.name == 'ValidationError') {
                    this.setState({ error: err.data });
                }
            });
    }

    render() {
        const { data, error } = this.state;
        return (
            <>
                <Head>
                    <title>重置密码</title>
                </Head>
                <Layout {...this.props.layout}>
                    <Layout.Left>
                        <Panel title="重置密码">
                            <Form className={styles.register}>
                                <Form.Item label="邮箱" error={error.email}>
                                    <input value={data.email} onChange={this.onInputChange('email')} />
                                </Form.Item>
                                <Form.Item label="新密码" error={error.password}>
                                    <input value={data.password} type="password" onChange={this.onInputChange('password')} />
                                </Form.Item>
                                <Form.Item label="验证码" error={error.code} className={styles.captcha}>
                                    <input value={data.code} onChange={this.onInputChange('code')} />
                                    <a href="javascript:;" className={this.state.timeout && styles.disabled} onClick={this.onSend}>{this.state.timeout ? `${this.state.timeout}s后可重新发送` : "发送验证码"} </a>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" onClick={this.onSubmit}>提交</Button>
                                </Form.Item>
                            </Form>
                        </Panel>
                    </Layout.Left>
                    <Layout.Right>
                    </Layout.Right>
                </Layout>
            </>
        )
    }
}

export default Reset;