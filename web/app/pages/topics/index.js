import React from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import Panel from '../../components/panel';
import Pagination from '../../components/pagination';
import TopicWidget from '../../components/widget/topic';
import util from '../../util';
import styles from './style.less';


class Topics extends React.Component {
  static async getInitialProps(ctx) {
    const [ layout, main, topicWidget ] = await Promise.all([
      Layout.getInitialProps(ctx),
      Main.getInitailProps(ctx),
      TopicWidget.getInitialProps({ ...ctx, params: { type: 'latest' } })
    ]);
    return { layout, main, topicWidget }
  }

  render() {
    return (
      <>
        <Head>
          <title>全部话题</title>
        </Head>
        <Layout {...this.props.layout}>
          <Layout.Left>
            <Main {...this.props.main} />
          </Layout.Left>
          <Layout.Right>
            <TopicWidget title="最新话题" {...this.props.topicWidget} />
          </Layout.Right>
        </Layout>
      </>
    )
  }
}

class Main extends React.Component {
  static async getInitailProps(ctx) {
    return {
      query: ctx.query,
      path: ctx.pathname,
      topics: await util.request.get('/api/pageTopic', ctx.query, {
        headers: {
          cookie: ctx.req.headers.cookie
        }
      })
    }
  }

  render() {
    const { topics, query, path } = this.props
    return (
      <Panel title="全部话题">
        <div className={styles.topics}>
          <ul>
            {topics.rows.map(topic => (
              <li><a href="javascript:;" href={`/topic/${topic.id}`}>{topic.name}({topic.posts || 0})</a></li>
            ))}
          </ul>
        </div>
        <Pagination query={query} path={path} total={topics.count} pageSize={100} />
      </Panel>
    )
  }
}

export default Topics;