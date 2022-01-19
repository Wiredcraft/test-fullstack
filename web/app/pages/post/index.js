import React from 'react';
import Head from 'next/head';
import { LoginContext } from '../../components/context';
import Layout from '../../components/layout';
import Editor from '../../components/editor';
import Icon from '../../components/icon';
import Time from '../../components/time';
import Markdown from '../../components/markdown';
import Action from '../../components/action';
import ReplyList from '../../components/list/reply';
import Pagination from '../../components/pagination';
import PostWidget from '../../components/widget/post';
import UserWidget from '../../components/widget/user';
import util from '../../util';
import styles from './style.less';

class Post extends React.Component {
  static async getInitialProps(ctx) {
    const main = await Main.getInitialProps(ctx);
    const [ layout, hotPost, user ] = await Promise.all([
      Layout.getInitialProps(ctx),
      PostWidget.getInitialProps({ ...ctx, params: { type: 'related', creator: main.post.creator.id } }),
      UserWidget.getInitialProps({ ...ctx, params: { id: main.post.creator.id }})
    ])

    return { main, layout, hotPost, user };
  }

  render() {
    const { layout, main, hotPost, user } = this.props;
    return (
      <>
        <Head>
        <title>{main.post.title}</title>
        </Head>
        <Layout {...layout} curTopic={main.post.topic}>
          <Layout.Left>
            <Main {...main} />
          </Layout.Left>
          <Layout.Right>
            <UserWidget {...user} />
            <PostWidget title="作者的其他主题" {...hotPost} />
          </Layout.Right>
        </Layout>
      </>
    )
  }
}

class Main extends React.Component {
  static contextType = LoginContext;
  static async getInitialProps(ctx) {
      const [ post, replies ] = await Promise.all([
          util.request.get('/api/getPost', { id: ctx.query.id }, {
              headers: {
                  cookie: ctx.req.headers.cookie
              }
          }),
          util.request.get('/api/pageReply', { post: ctx.query.id, page: ctx.query.page }, {
              headers: {
                  cookie: ctx.req.headers.cookie
              }
          }),
          util.request.get('/api/viewPost', { id: ctx.query.id }, {
              headers: {
                  cookie: ctx.req.headers.cookie
              }
          })
      ])

      return { query: ctx.query, path: ctx.pathname, post, replies }
  }

  constructor(props) {
      super(props);
      this.state = {
          post: props.post,
          error: ''
      }
  }

  onReplyChange = value => {
      this.setState({ reply: value });
  }

  onReplySubmit = e => {
      this.setState({ error: ''});
      util.request.post('/api/addReply', {
          post: this.props.post.id,
          content: this.state.reply,
      }).then(body => {
          location.reload();
      }).catch(e => {
          this.setState({ error: e.message });
      })
  }

  render() {
      const { query, path, replies } = this.props;
      const { post } = this.state;
      const append = post.append ? JSON.parse(post.append) : [];

      return (
          <>
              <div className={styles.post}>
                  <div className={styles.header}>
                      <h3><a href="/">首页</a> / <a href={`/topic/${post.topic.id}`}>{post.topic.name}</a></h3>
                      <h1>{post.title}</h1>
                  </div>
                  <div className={styles.body}>
                      {post.content && (
                          <div className={styles.content}>
                              <Markdown>{post.content}</Markdown>
                          </div>
                      )}
                      {append.map((item, index) => (
                          <div className={styles.content}>
                              <h3>第{index + 1}条附言 <span className={styles.dot}>•</span> <Time date={item.createdAt} /></h3>
                              <Markdown>{item.content}</Markdown>
                          </div>
                      ))}
                  </div>
                  <div className={styles.footer}>
                      <span className={styles.user}><a  href={`/user/${post.creator.id}`}>{post.creator.name}</a></span><span className={styles.dot}>•</span>
                      <span><Time date={post.createdAt} /></span><span className={styles.dot}>•</span>
                      <span><em>{post.views}</em> 次浏览</span>
                      {post.likes > 0 && <span className={styles.stat}><Icon type="like" /> <em>{post.likes}</em></span>}
                      {post.blocks > 0 && <span className={styles.stat}><Icon type="block" /> <em>{post.blocks}</em></span>}
                      {this.context && (
                          <Action type="POST" entity={post} className={styles.action}>
                            {this.context.id == post.creator.id && <a href={`/append/${post.id}`} ><Icon type="pencil" /></a>}
                          </Action>
                      )}
                  </div>
              </div>
              {replies.count > 0 && (
                  <div className={styles.reply}>
                      <div className={styles.header}>
                          <h1>共<em>{replies.count}</em>条回复</h1>
                      </div>
                      <div className={styles.body}>
                          <div>
                              <ReplyList replies={replies.rows} showAction={true} pageSize={50} page={query.page} />
                              <Pagination current={query.page} query={query} path={path} pageSize={50} total={replies.count} />
                          </div>
                      </div>
                  </div>
              )}
              <div className={styles.addReply}>
                  <div className={styles.header}>
                      <h1>添加回复</h1>
                  </div>
                  <div className={styles.body}>
                      {!this.context && (
                          <div className={styles.tip}>
                              <p><a href="/login">登录</a> 后再评论</p>
                          </div>
                      )}
                      <Editor className={styles.editor} mode="simple" onChange={this.onReplyChange} />
                  </div>
                  <div className={styles.footer}>
                      <span className={styles.error}>{this.state.error}</span>
                      <a href="javascript:;" className={styles.submit} onClick={this.onReplySubmit}>发表</a>
                  </div>
              </div>
          </>
      )
  }
}

export default Post;