import React,  { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import { LoginContext } from '../../components/context';
import Layout from '../../components/layout';
import Panel from '../../components/panel';
import Avatar from '../../components/avatar';
import Icon from '../../components/icon';
import Action from '../../components/action';
import Pagination from '../../components/pagination';
import PostList from '../../components/list/post';
import ReplyList from '../../components/list/reply';
import StatWidget from '../../components/widget/stat';
import util from '../../util';
import styles from './style.less';

class Index extends React.Component {
    static async getInitialProps(ctx) {
        const [layout, main, posts, replies, userStat] = await Promise.all([
            Layout.getInitialProps(ctx),
            Main.getInitialProps(ctx),
            Posts.getInitialProps(ctx),
            Replies.getInitialProps(ctx),
            StatWidget.getInitialProps({ ...ctx, params: { type: 'user', creator: ctx.query.id } })
        ]);

        return { layout, main, posts, replies, userStat }
    }

    render() {
        return (
            <>
                <Head>
                    <title>{this.props.main.user.name}</title>
                </Head>
                <Layout {...this.props.layout}>
                    <Layout.Left>
                        <Main {...this.props.main} />
                        <Posts {...this.props.posts} />
                        <Replies {...this.props.replies} />
                    </Layout.Left>
                    <Layout.Right>
                        <StatWidget {...this.props.userStat} />
                    </Layout.Right>
                </Layout>
            </>
        )
    }
}

Main.getInitialProps = async function(ctx) {
    return {
        user: await util.request.get('/api/getUser', ctx.query, {
            headers: {
                cookie: ctx.req.headers.cookie
            }
        })
    }
}

function Main(props) {
    const context = useContext(LoginContext);
    const [ user, setUser ] = useState(props.user || {});

    return (
        <div className={styles.board}>
            <div className={styles.header}>
                <div className={styles.avatar}>
                    <Avatar src={user.avatar} />
                </div>
                <div className={styles.meta}>
                    <h5>
                        {context && (
                            <Action type="USER" entity={user} className={styles.action} />
                        )}
                        {user.name} 
                    </h5>
                    <p>乌托邦 第 {user.no} 号会员， 加入于 {user.registerAt}</p>
                    <div>
                        {user.likes > 0 && <span className={styles.stat}><Icon type="like" /> <em>{user.likes}</em></span>}
                        {user.blocks > 0 && <span className={styles.stat}><Icon type="block" /> <em>{user.blocks}</em></span>}
                    </div>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.info}>
                    <ul>
                        <li>
                            <label>联系方式</label> {user.contact || "未填写"}
                        </li>
                        <li>
                            <label>位置</label> {user.location || "未填写"}
                        </li>
                        <li>
                            <label>个人网站</label> {user.website || "未填写"}
                        </li>
                        <li>
                            <label>签名</label> {user.description || "未填写"}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

Posts.getInitialProps = async function(ctx) {
    return {
        creator: ctx.query.id,
        posts: await util.request.get('/api/pagePost', { creator: ctx.query.id }, {
            headers: {
                cookie: ctx.req.headers.cookie
            }
        })
    }
}

function Posts(props) {
    const [postList, setPostList] = useState(props.posts.rows);
    const [pagination, setPagination] = useState({ page: 1, total: props.posts.count });

    useEffect(() => {
        util.request.get('/api/pagePost', {
            creator: props.creator,
            page: pagination.page
        }).then(body => {
            setPostList(body.rows);
            setPagination({ ...pagination, total: body.count })
        })
    }, [pagination.page]);

    return (
        <Panel title={`他的主题`}>
            <PostList posts={postList} />
            <Pagination current={pagination.page} total={pagination.total} onChange={page => setPagination({ page })} />
        </Panel>
    )
}

Replies.getInitialProps = async function(ctx) {
    return {
        creator: ctx.query.id,
        replies: await util.request.get('/api/pageReply', { creator: ctx.query.id }, {
            headers: {
                cookie: ctx.req.headers.cookie
            }
        })
    }
}

function Replies(props) {
    const [replyList, setReplyList] = useState(props.replies.rows);
    const [pagination, setPagination] = useState({ page: 1, total: props.replies.count });

    useEffect(() => {
        util.request.get('/api/pageReply', {
            creator: props.creator,
            page: pagination.page
        }).then(body => {
            setReplyList(body.rows);
            setPagination({ ...pagination, total: body.count })
        })
    }, [pagination.page]);

    return (
        <Panel title={`他的回复`}>
            <ReplyList replies={replyList} page={pagination.page} pageSize={10} />
            <Pagination current={pagination.page} total={pagination.total} onChange={page => setPagination({ page })} />
        </Panel>
    )
}

export default Index;