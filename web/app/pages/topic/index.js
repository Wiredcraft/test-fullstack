import React from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import Panel from '../../components/panel';
import PostList from '../../components/list/post';
import Pagination from '../../components/pagination';
import PostWidget from '../../components/widget/post';
import TopicWidget from '../../components/widget/topic';
import StatWidget from '../../components/widget/stat';
import util from '../../util';
import styles from './style.less';


class Topic extends React.Component {
  static async getInitialProps(ctx) {
    const [ layout, main, siteStat, hotPost, hotTopic ] = await Promise.all([
      Layout.getInitialProps(ctx),
      Main.getInitailProps(ctx),
      StatWidget.getInitialProps({ ...ctx, params: { type: 'site' } }),
      PostWidget.getInitialProps({ ...ctx, params: { type: 'hottest', topic: ctx.query.id } }),
      TopicWidget.getInitialProps({ ...ctx, params: { type: 'hottest' } })
    ]);

    return { layout, main, hotPost, hotTopic, siteStat }
  }

  render() {
    const { layout, main, hotPost, hotTopic, siteStat } = this.props;
    return (
      <>
        <Head>
          <title>{main.topic.name}</title>
        </Head>
        <Layout {...layout} curTopic={main.topic}>
          <Layout.Left>
            <Main {...main} />
          </Layout.Left>
          <Layout.Right>
            <PostWidget title="今日热议" {...hotPost} />
            <TopicWidget {...hotTopic} title="热门话题" showTotal />
            <StatWidget {...siteStat} />
          </Layout.Right>
        </Layout>
      </>
    )
  }
}

class Main extends React.Component {
  static async getInitailProps(ctx) {
    const [topic, posts] = await Promise.all([
      util.request.get('/api/getTopic', { id: ctx.query.id }, {
        headers: {
          cookie: ctx.req.headers.cookie
        }
      }),
      util.request.get('/api/pagePost', { topic: ctx.query.id, page: ctx.query.page }, {
        headers: {
          cookie: ctx.req.headers.cookie
        }
      })
    ])
    
    return { query: ctx.query, path: ctx.pathname, topic, posts }
  }

  constructor(props) {
    super(props);

    this.state = {
      topic: props.topic
    }
  }

  onToggleFollow = () => {
    const { topic } = this.state;
    if (topic.followed) {
      util.request.post('/api/unrelation', { type: 'FOLLOW_TOPIC', target: topic.id })
        .then(() => {
          this.setState({
            topic: {
              ...topic,
              followed: false
            }
          })
        })
    } else {
      util.request.post('/api/relation', { type: 'FOLLOW_TOPIC', target: topic.id })
        .then(() => {
          this.setState({
            topic: {
              ...topic,
              followed: true
            }
          })
        })
    }
  }

  render() {
    const { topic } = this.state;
    const { posts, path, query } = this.props;
    return (
      <Panel
        title={(
          <div className={styles.customTitle}>
            <a href="javascript:;" className={topic.followed ? styles.followed : ''} onClick={this.onToggleFollow}>{topic.followed ? '取消关注' : '关注'}</a>
            <h3>{topic.name}<span className={styles.meta}><span className={styles.dot}>•</span><em>{topic.posts || 0}</em> 主题<span className={styles.dot}>•</span><em>{topic.followers || 0}</em> 关注</span></h3>
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

export default Topic;