import React from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import Panel from '../../components/panel';
import Widget from '../../components/widget';
import Form, { Button } from '../../components/form';
import util from '../../util';
import styles from './style.less';

class Login extends React.Component {
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
        captcha: ''
      },
      error: {},
      timestamp: Date.now()
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

  onCaptchaChange = e => {
    this.setState({ timestamp: Date.now() });
  }

  onSubmit = e => {
    this.setState({ error: {} });
    util.request.post('/api/login', this.state.data)
      .then(body => {
        location.href = '/';
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
          <title>登录</title>
        </Head>
        <Layout {...this.props.layout}>
          <Layout.Left>
            <Panel title="登录">
              <Form className={styles.login}>
                <Form.Item label="邮箱" error={error.email}>
                  <input value={data.email} onChange={this.onInputChange('email')} />
                </Form.Item>
                <Form.Item label="密码" error={error.password}>
                  <input value={data.password} type="password" onChange={this.onInputChange('password')} />
                </Form.Item>
                <Form.Item label="验证码" error={error.captcha} className={styles.captcha}>
                  <input value={data.captcha} onChange={this.onInputChange('captcha')} />
                  <img src={`/captcha?t=${this.state.timestamp}`} onClick={this.onCaptchaChange} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={this.onSubmit}>登录</Button>
                  <a className={styles.tip} href="/reset">忘记密码？</a>
                </Form.Item>
              </Form>
            </Panel>
          </Layout.Left>
          <Layout.Right>
            <Widget title="登录须知" className={styles.guide}>
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

export default Login