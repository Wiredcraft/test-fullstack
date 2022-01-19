import React from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import Panel from '../../components/panel';
import Markdown from '../../components/markdown';

class About extends React.Component {
  static async getInitialProps(ctx) {
    return {
      layout: await Layout.getInitialProps(ctx)
    }
  }

  content = `
    乌托邦社区是一个基于投票机制的自治社区，我们鼓励普通用户参与社区治理，致力于将志同道合的人聚在一起。
  `

  render() {
    return (
      <>
        <Head>
          <title>关于</title>
        </Head>
        <Layout {...this.props.layout}>
          <Layout.Left>
            <Panel title="关于">
              <div className="markdown-body cleanslate" style={{padding: "10px"}}>
                <Markdown>
                  {this.content}
                </Markdown>
              </div>
            </Panel>
          </Layout.Left>
          <Layout.Right>
          </Layout.Right>
        </Layout>
      </>
    )
  }
}

export default About