import React from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import Panel from '../../components/panel';
import Widget from '../../components/widget';
import Form, { Button } from '../../components/form';
import util from '../../util';
import styles from './style.less';

class Register extends React.Component {
    static async getInitialProps(ctx) {
        return {
            layout: await Layout.getInitialProps(ctx)
        }
    }
    
    constructor(props) {
        super(props);

        this.state = {
            data: {
                name: '',
                email: '',
                password: '',
                code: '',
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

        util.request.post('/api/register', this.state.data)
            .then(body => {
                window.dispatchEvent(new CustomEvent('appmessage', { detail: { message: '注册成功，即将进入首页' } }));
                setTimeout(() => {
                    location.href = "/login";
                }, 1000);
            })
            .catch(err => {
                if (err.name == 'ValidationError') {
                    this.setState({ error: err.data });
                }
            })
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
            })
    }

    render() {
        const { data, error } = this.state;
        return (
            <>
                <Head>
                    <title>注册</title>
                </Head>
                <Layout {...this.props.layout}>
                    <Layout.Left>
                        <Panel title="注册">
                            <Form className={styles.register}>
                                <Form.Item label="昵称" error={error.name}>
                                    <input value={data.name} onChange={this.onInputChange('name')} />
                                </Form.Item>
                                <Form.Item label="邮箱" error={error.email}>
                                    <input value={data.email} onChange={this.onInputChange('email')} />
                                </Form.Item>
                                <Form.Item label="密码" error={error.password}>
                                    <input value={data.password} type="password" onChange={this.onInputChange('password')} />
                                </Form.Item>
                                <Form.Item label="验证码" error={error.code} className={styles.captcha}>
                                    <input value={data.code} onChange={this.onInputChange('code')} />
                                    <a href="javascript:;" className={this.state.timeout && styles.disabled} onClick={this.onSend}>{this.state.timeout ? `${this.state.timeout}s后可重新发送` : "发送验证码"} </a>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" onClick={this.onSubmit}>注册</Button>
                                    <a className={styles.tip} href="/login">已有账号？</a>
                                </Form.Item>
                            </Form>
                        </Panel>
                    </Layout.Left>
                    <Layout.Right>
                        <Widget title="注册须知" className={styles.guide}>
                            <ul>
                                <li>1. 欢迎您登录乌托邦社区 </li>
                                <li>2. 乌托邦是一个由社区用户共同治理的自治社区，致力于将志同道合的人聚在一起</li>
                                <li>3. 关于社区的运行规则，请参考 <a href="/guide">新手入门</a></li>
                            </ul>
                        </Widget>
                    </Layout.Right>
                </Layout>
            </>
        )
    }
}

export default Register;