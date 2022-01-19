import React from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import Panel from '../../components/panel';
import Markdown from '../../components/markdown';

class Corp extends React.Component {
  static async getInitialProps(ctx) {
    return {
      layout: await Layout.getInitialProps(ctx)
    }
  }

  content = `
  #### 待完善 
  `
  
  render() {
    return (
      <>
        <Head>
          <title>API</title>
        </Head>
        <Layout {...this.props.layout}>
          <Layout.Left>
            <Panel title="API">
              <div className="markdown-body cleanslate" style={{padding: "0 10px"}}>
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

export default Corp