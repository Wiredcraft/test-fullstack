import React from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import Panel from '../../components/panel';
import PostList from '../../components/list/post';
import ReplyList from '../../components/list/reply';
import UserList from '../../components/list/user';
import Pagination from '../../components/pagination';
import util from '../../util';

class Guide extends React.Component {
  static async getInitialProps(ctx) {
    const type = ctx.query.type;

    let title;
    if (type == 'user') {
      title = '屏蔽的用户'
    }

    if (type == 'post') {
      title = '屏蔽的主题'
    }

    if (type == 'reply') {
      title = '屏蔽的回复'
    }

    const [layout, results] = await Promise.all([
      Layout.getInitialProps(ctx),
      util.request.get('/api/blocked', ctx.query, {
        headers: {
          cookie: ctx.req.headers.cookie
        }
      })
    ])

    return { layout, results, title, type, query: ctx.query, path: ctx.pathname };
  }

  render() {
    const { results, type, path, query } = this.props; 

    return (
      <>
        <Head>
          <title>{this.props.title}</title>
        </Head>
        <Layout {...this.props.layout}>
          <Layout.Left>
            <Panel title={this.props.title}>
              {type == 'user' && (
                <>
                  <UserList users={results.rows} />
                  <Pagination current={query.page} query={{}} path={path} total={results.count} pageSize={30} />
                </>
              )}

              {type == 'post' && (
                <>
                  <PostList posts={results.rows} />
                  <Pagination current={query.page} query={{}} path={path} total={results.count} pageSize={30} />
                </>
              )}

              {type == 'reply' && (
                <>
                  <ReplyList replies={results.rows} />
                  <Pagination current={query.page} query={{}} path={path} total={results.count} pageSize={30} />
                </>
              )}
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