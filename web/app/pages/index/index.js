import React from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import Panel from '../../components/panel';
import PostList from '../../components/list/post';
import Pagination from '../../components/pagination';
import PostWidget from '../../components/widget/post';
import TopicWidget from '../../components/widget/topic';
import RuleWidget from '../../components/widget/rule';
import StatWidget from '../../components/widget/stat';
import IntroWidget from '../../components/widget/intro';
import util from '../../util';
import styles from './style.less';

Page.getInitialProps = async function (ctx) {
  const [ layout, main, siteStat, hotPost, hotTopic ] = await Promise.all([
    Layout.getInitialProps(ctx),
    Main.getInitailProps(ctx),
    StatWidget.getInitialProps({ ...ctx, params: { type: 'site' } }),
    PostWidget.getInitialProps({ ...ctx, params: { type: 'hottest' } }),
    TopicWidget.getInitialProps({ ...ctx, params: { type: 'hottest' } }),
  ]);

  return { layout, main, hotPost, hotTopic, siteStat }
}

export default function Page(props) {
  return (
    <>
      <Head>
        <title>乌托邦—理想者的社区</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout {...props.layout} curTopic={{ id: 0 }}>
        <Layout.Left>
          <Main {...props.main} />
        </Layout.Left>
        <Layout.Right>
          <IntroWidget />
          <PostWidget {...props.hotPost} title="今日热议" />
          <TopicWidget {...props.hotTopic} title="热门话题" showTotal />
          <RuleWidget />
          <StatWidget {...props.siteStat} />
        </Layout.Right>
      </Layout>
    </>
  )
}

class Main extends React.Component {
  static async getInitailProps(ctx) {
    const [topic, posts] = await Promise.all([
      util.request.get('/api/getTopic', { id: 0 }, {
        headers: {
          cookie: ctx.req.headers.cookie
        }
      }),
      util.request.get('/api/pagePost', { topic: 0, page: ctx.query.page }, {
        headers: {
          cookie: ctx.req.headers.cookie
        }
      })
    ])
    
    return {
      query: ctx.query,
      path: ctx.pathname,
      topic: {
        ...topic,
        posts: posts.count
      },
      posts: posts
    }
  }

  render() {
    const { topic, posts, path, query } = this.props;
    return (
      <Panel
        title={(
          <div className={styles.customTitle}>
            <h3>{topic.name}<span className={styles.meta}><span className={styles.dot}>•</span><em>{topic.posts}</em> 主题</span></h3>
          </div>
        )}
      >
        <div className={styles.posts}>
          <PostList posts={posts.rows} />
          <Pagination current={query.page} query={query} path={path} total={posts.count} pageSize={30} />
        </div>
      </Panel>
    )
  }
}