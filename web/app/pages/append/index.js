import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Markdown from '../../components/markdown';
import Layout from '../../components/layout';
import { Button } from '../../components/form';
import Widget from '../../components/widget';
import Editor from '../../components/mde';
import Time from '../../components/time';
import util from '../../util';
import styles from './style.less';

AppendPage.getInitialProps = async (ctx) => {
  return {
    layout: await Layout.getInitialProps(ctx),
    post: await util.request.get('/api/getPost', ctx.query, {
        headers: {
            cookie: ctx.req.headers.cookie
        }
    })
  }
}

function AppendPage(props) {
  const { post } = props;
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const append = post.append ? JSON.parse(post.append) : [];

  useEffect(() => {
    if (localStorage.getItem('append_post_data')) {
      setContent(localStorage.getItem('append_post_data'));
    }
  }, [])

  function onContentChange(value) {
    localStorage.setItem('append_post_data', value)
    setContent(value)
  }

  function onSubmit(e) {
    setMessage('');
    util.request.post('/api/appendPost', { id: post.id, content: content })
      .then(() => {
        localStorage.removeItem('append_post_data')
        location.href = `/post/${post.id}`
      })
      .catch(e => {
        setMessage(e.message);
      })
  }

  return (
    <>
      <Head>
        <title>发布主题</title>
        <link rel="stylesheet" href="/libs/font-awesome/css/font-awesome.min.css"/>
        <link rel="stylesheet" href="/libs/simplemde.min.css"/>
        <script src="/libs/simplemde.min.js"></script>
      </Head>
      <Layout {...props.layout}>
        <Layout.Left>
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
            <div className={styles.append}>
              <h3>追加附言</h3>
              <div className={styles.content}>
                <Editor value={content} onChange={onContentChange} />
              </div>
              <div className={styles.bottom}>
                <span className={styles.error}>{message}</span>
                <Button type="primary" onClick={onSubmit}>发布</Button>
              </div>
            </div>
          </div>
        </Layout.Left>
        <Layout.Right>
          <Widget title="发帖须知">
            <div>
              <ul>
                <li><a href="javascript:;">使用指南</a></li>
              </ul>
            </div>
          </Widget>
        </Layout.Right>
      </Layout>
    </>
  )
}

export default AppendPage;