import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../../components/layout';
import Panel from '../../components/panel';
import Pagination from '../../components/pagination';
import PostList from '../../components/list/post';
import ReplyList from '../../components/list/reply';
import Icon from '../../components/icon';
import Avatar from '../../components/avatar';
import Time from '../../components/time';
import Widget from '../../components/widget';
import ReactCrop from 'react-image-crop';
import Cookies from 'universal-cookie';
import Form, { Button } from '../../components/form';
import util from '../../util';
import styles from './style.less';

export async function getServerSideProps(ctx) {

    const [query, layout, home, setting, message] = await Promise.all([
        ctx.query,
        Layout.getInitialProps(ctx),
        Home.getInitialProps(ctx),
        Setting.getInitialProps(ctx),
        Message.getInitialProps(ctx)
    ])
    return {
        props: { query, layout, home, setting, message }
    }
}

export default function (props) {
    const { query } = props;
    return (
        <>
            <Head>
                <title>admin</title>
            </Head>
            <Layout {...props.layout}>
                <Layout.Left>
                    {query.tab == null && (<Home {...props.home} />)}
                    {query.tab == "setting" && (<Setting {...props.setting} />)}
                    {query.tab == "message" && (<Message {...props.message} />)}
                </Layout.Left>
                <Layout.Right>
                    <Widget title="用户中心" className={styles.nav}>
                        <ul>
                            <li><a href="/admin">首页</a></li>
                            <li><a href="/admin?tab=setting">设置</a></li>
                            <li><a href="/admin?tab=message">消息</a></li>
                        </ul>
                    </Widget>
                </Layout.Right>
            </Layout>
        </>
    )
}

/** Home */
Home.getInitialProps = async function (ctx) {
    const [main, posts, replies] = await Promise.all([
        Home.Main.getInitialProps(ctx),
        Home.Posts.getInitialProps(ctx),
        Home.Replies.getInitialProps(ctx)
    ])
    return { main, posts, replies };
}

function Home(props) {
    return (
        <>
            <Home.Main {...props.main} />
            <Home.Posts {...props.posts} />
            <Home.Replies {...props.replies} />
        </>
    )
}

Home.Main = function Main(props) {
    const user = props.user || {};

    return (
        <div className={styles.board}>
            <div className={styles.header}>
                <div className={styles.avatar}>
                    <Avatar src={user.avatar} />
                </div>
                <div className={styles.meta}>
                    <h5> {user.name} </h5>
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

Home.Main.getInitialProps = async function (ctx) {
    return {
        user: await util.request.get('/api/getUser', {}, {
            headers: {
                cookie: ctx.req.headers.cookie
            }
        })
    }
}

Home.Posts = function Page(props) {
    const [init, setInit] = useState(false);
    const [postList, setPostList] = useState(props.posts.rows);
    const [pagination, setPagination] = useState({ page: 1, total: props.posts.count });

    useEffect(() => {
        if (!init) {
            setInit(true);
        } else {
            util.request.get('/api/pagePost', {
                creator: props.creator,
                page: pagination.page
            }).then(body => {
                setPostList(body.rows);
                setPagination({ ...pagination, total: body.count })
            })
        }
    }, [pagination.page]);

    return (
        <Panel title={`我的主题`}>
            <PostList posts={postList} />
            <Pagination current={pagination.page} total={pagination.total} onChange={page => setPagination({ page })} />
        </Panel>
    )
}

Home.Posts.getInitialProps = async function (ctx) {
    return {
        creator: ctx.req.session.user.id,
        posts: await util.request.get('/api/pagePost', { creator: ctx.req.session.user.id }, {
            headers: {
                cookie: ctx.req.headers.cookie
            }
        })
    }
}

Home.Replies = function Page(props) {
    const [init, setInit] = useState(false);
    const [replyList, setReplyList] = useState(props.replies.rows);
    const [pagination, setPagination] = useState({ page: 1, total: props.replies.count });

    useEffect(() => {
        if (!init) {
            setInit(true);
        } else {
            util.request.get('/api/pageReply', {
                creator: props.creator,
                page: pagination.page
            }).then(body => {
                setReplyList(body.rows);
                setPagination({ ...pagination, total: body.count })
            })
        }
    }, [pagination.page]);

    return (
        <Panel title={`我的回复`}>
            <ReplyList replies={replyList} page={pagination.page} pageSize={10} />
            <Pagination current={pagination.page} total={pagination.total} onChange={page => setPagination({ page })} />
        </Panel>
    )
}

Home.Replies.getInitialProps = async function (ctx) {
    return {
        creator: ctx.req.session.user.id,
        replies: await util.request.get('/api/pageReply', { creator: ctx.req.session.user.id }, {
            headers: {
                cookie: ctx.req.headers.cookie
            }
        })
    }
}

/** Setting */
Setting.getInitialProps = async function (ctx) {
    return {
        user: await util.request.get('/api/getUser', {}, {
            headers: {
                cookie: ctx.req.headers.cookie
            }
        })
    }
}

function Setting(props) {
    return (
        <>
            <Setting.Basic {...props} />
            <Setting.Avatar {...props} />
            <Setting.Password {...props} />
        </>
    )
}

Setting.Basic = function (props) {
    const [data, setData] = useState(props.user);

    function onFieldChange(field) {
        return (e) => {
            setData({ ...data, [field]: e.target.value });
        }
    }

    function onSumbit() {
        util.request.post('/api/updateUserInfo', data)
            .then(body => {
                window.dispatchEvent(new CustomEvent('appmessage', { detail: { message: '基本信息保存成功' } }));
            })
    }

    return (
        <Panel title="基本信息" className={styles.profile}>
            <Form className={styles.form}>
                <Form.Item label="昵称">{props.user.name}</Form.Item>
                <Form.Item label="邮箱"> {props.user.email}</Form.Item>
                <Form.Item label="联系方式">
                    <input value={data.contact} onChange={onFieldChange('contact')} />
                </Form.Item>
                <Form.Item label="位置">
                    <input value={data.location} onChange={onFieldChange('location')} />
                </Form.Item>
                <Form.Item label="个人网站">
                    <input value={data.website} onChange={onFieldChange('website')} />
                </Form.Item>
                <Form.Item label="签名">
                    <textarea value={data.description} onChange={onFieldChange('description')} />
                </Form.Item>
                <Form.Item label="">
                    <Button type="primary" onClick={onSumbit}>保存</Button>
                </Form.Item>
            </Form>
        </Panel>
    )
}

Setting.Avatar = function (props) {
    const [scale, setScale] = useState({ x: 1, y: 1 });
    const [crop, setCrop] = useState({ unit: 'px', x: 0, y: 0, width: 96, height: 96, aspect: 1 / 1 });
    const [tempFile, setTempFile] = useState('');

    function onAvatarChange(e) {
        const body = new FormData();
        body.append('avatar', e.target.files[0]);
        fetch(`/api/uploadAvatar`, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'x-csrf-token': (new Cookies()).get('csrfToken')
            },
            method: 'POST', body
        })
            .then(res => res.json())
            .then(res => {
                setTempFile(res.data.name);
            })
    }

    function onImageLoaded(image) {
        setScale({
            x: image.naturalWidth / image.width,
            y: image.naturalHeight / image.height
        })
    }

    function onCropChange(crop) {
        setCrop(crop);
    }

    function onSubmit() {
        util.request.post("/api/updateUserAvatar", {
            input: tempFile,
            select: {
                x: crop.x * scale.x,
                y: crop.y * scale.y,
                width: crop.width * scale.x,
                height: crop.height * scale.y
            }
        }).then(body => {
            window.dispatchEvent(new CustomEvent('appmessage', { detail: { message: '用户头像修改成功' } }));
            setTimeout(() => {
                location.reload();
            }, 1000);
        })
    }

    return (
        <Panel title="修改头像" className={styles.avatar}>
            <Form className={styles.form}>
                <Form.Item label="当前头像">
                    <div className={styles.original}>
                        <Avatar src={props.user.avatar} />
                    </div>
                </Form.Item>
                <Form.Item label="新的头像">
                    <input type="file" onChange={onAvatarChange} />
                </Form.Item>
                <Form.Item label="">
                    <ReactCrop
                        keepSelection
                        src={`/temp/${tempFile}`}
                        crop={crop}
                        onImageLoaded={onImageLoaded}
                        onChange={onCropChange}
                    />
                </Form.Item>
                <Form.Item label="">
                    <Button type="primary" onClick={onSubmit}>上传</Button>
                </Form.Item>
            </Form>
        </Panel>
    )
}

Setting.Password = function (props) {
    const [data, setData] = useState({});
    const [error, setError] = useState({});

    function onFieldChange(field) {
        return (e) => {
            setData({ ...data, [field]: e.target.value });
        }
    }

    function onSubmit() {
        setError({});
        util.request.post('/api/updateUserPassword', data).then(body => {
            setData({ passwordOld: "", passwordNew: "" });
            window.dispatchEvent(new CustomEvent('appmessage', { detail: { message: '用户密码修改成功' } }));
        }).catch(err => {
            if (err.name == 'ValidationError') {
                setError(err.data)
            } else {
                throw err;
            }
        })
    }

    return (
        <Panel title="修改密码" className={styles.password}>
            <Form className={styles.form}>
                <Form.Item label="原密码" error={error.passwordOld}>
                    <input type="password" value={data.passwordOld} onChange={onFieldChange('passwordOld')} />
                </Form.Item>
                <Form.Item label="新密码" error={error.passwordNew}>
                    <input type="password" value={data.passwordNew} onChange={onFieldChange('passwordNew')} />
                </Form.Item>
                <Form.Item label="">
                    <Button type="primary" onClick={onSubmit}>修改</Button>
                </Form.Item>
            </Form>
        </Panel>
    )
}

/** Message */
function Message(props) {
    const [init, setInit] = useState(false);
    const [messageList, setMessageList] = useState(props.messages.rows);
    const [pagination, setPagination] = useState({ page: 1, total: props.messages.count });

    useEffect(() => {
        if (!init) {
            setInit(true);
        } else {
            util.request.get('/api/pageMessage', {
                page: pagination.page
            }).then(body => {
                setMessageList(body.rows);
                setPagination({ ...pagination, total: body.count })
            })
        }
    }, [pagination.page]);

    return (
        <Panel title="消息列表">
            <div>
                <ul>
                    {messageList.map(({ source: item, status }, index) => (
                        <li key={item.id}>
                            <div className={`${styles.message} ${styles[status]}`}>
                                <div className={styles.avatar}>
                                    <a href={`/user/${item.creator.id}`}>
                                        <Avatar src={item.creator.avatar} />
                                    </a>
                                </div>
                                <div className={styles.main}>
                                    <div className={styles.meta}>
                                        <span className={styles.user}><a href={`/user/${item.creator.id}`}>{item.creator.name}</a></span>
                                        <span className={styles.date}><Time date={item.createdAt} /></span>
                                    </div>
                                    <a href={`/post/${item.post.id || item.post}`}>
                                        <div className={styles.content}>
                                            {item.parent ? (
                                                <div className={styles.parent}>
                                                    <div>{item.parent.content}</div>
                                                </div>
                                            ) : (
                                                    <div className={styles.parent}>
                                                        <div>{item.post.title}</div>
                                                    </div>
                                                )}
                                            <div>
                                                {item.content}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <Pagination current={pagination.page} total={pagination.total} onChange={page => setPagination({ page })} />
            </div>
        </Panel>
    )
}

Message.getInitialProps = async function (ctx) {
    const messages = await util.request.get('/api/pageMessage', { page: 1 }, {
        headers: { cookie: ctx.req.headers.cookie }
    })

    await util.request.get('/api/readMessage', {}, {
        headers: { cookie: ctx.req.headers.cookie }
    })

    return { messages };
}