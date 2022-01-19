import React from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import Panel from '../../components/panel';
import Markdown from '../../components/markdown';

class Guide extends React.Component {
  static async getInitialProps(ctx) {
    return {
      layout: await Layout.getInitialProps(ctx)
    }
  }

  content = `
  欢迎您来到乌托邦社区。

  乌托邦社区是一个由社区用户共同治理的自治社区，我们致力于将志同道合的人聚在一起。
  我们始终相信“人以类聚，物以群分”，相信只有志同道合的人在一起，大家有相同的爱好，相同的兴趣，才能形成最好的社区。

  每个社区用户都是社区的管理员，都可以参与社区的治理，抵制任何让自己反感的主题。但是为了社区的健康发展和良好氛围，我们倡导大家对违反以下规则的内容进行抵制：

  1. 任何违反著作权和知识产权对行为
  2. 任何没有意义的灌水和恶意广告行为
  3. 任何涉及暴力，色情，侮辱，人肉的行为
  4. 任何违反你所在地区法律的的行为

  最后，希望大家能够在这里打发时间，分享事物，交流想法，发现机会，认识朋友，让这里成为一个真正的乌托邦社区。
  `

  render() {
    return (
      <>
        <Head>
          <title>新手入门</title>
        </Head>
        <Layout {...this.props.layout}>
          <Layout.Left>
            <Panel title="新手入门">
              <div className="markdown-body" style={{padding: "10px"}}>
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

export default Guide