import React from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import Panel from '../../components/panel';
import Markdown from '../../components/markdown';

class Rule extends React.Component {
  static async getInitialProps(ctx) {
    return {
      layout: await Layout.getInitialProps(ctx)
    }
  }

  content = `
  乌托邦社区运行细则（试行）：

  1. 超过三天没有回复的主题将会被屏蔽
  2. 被手雷轰炸大于~30%比例的主题、回复、用户也将会被屏蔽
  3. 每人每天的拥有的手雷数为12
  4. 被屏蔽超过七天的主题、回复将会被删除

  
  `

  render() {
    return (
      <>
        <Head>
          <title>规则</title>
        </Head>
        <Layout {...this.props.layout}>
          <Layout.Left>
            <Panel title="规则">
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

export default Rule