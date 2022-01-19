import { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../../components/context';
import { motion, AnimatePresence } from "framer-motion";
import Icon from '../icon';
import Time from '../time';
import Avatar from '../avatar';
import Editor from '../editor';
import Action from '../action';
import styles from './style.less';
import util from '../../util';

export default function (props) {
    const { page = 1, pageSize = 10 } = props;
    const context = useContext(LoginContext);

    const [ reply, setReply ] = useState(false);
    const [ replies, setReplies ] = useState(props.replies || []);

    useEffect(() => {
        setReplies(props.replies);
    }, [props.replies])

    function onReplyClick(item) {
        return () => {
            if (reply && reply.id == item.id) {
                setReply(false);
            } else {
                setReply({ id: item.id, content: '', error: '' });
            }
        }
    }

    function onReplyChange(item) {
        return (value) => {
            setReply({ 
                ...reply,
                content: value
             })
        }
    }

    function onReplySubmit(item) {
        return () => {
            util.request.post('/api/addReply', {
                post: item.post,
                parent: item.id,
                content: reply.content
            }).then(body => {
                location.reload();
            }).catch(err => {
                setReply({
                    ...reply,
                    error: err.message
                })
            })
        }
    }

    return (
        <ul>
            {replies.map((item, index) => (
                <li key={item.id}>
                    <div className={`${styles.reply} ${styles[item.status]}`}>
                        <div className={styles.avatar}>
                            <a href={`/user/${item.creator.id}`}>
                                <Avatar src={item.creator.avatar} />
                            </a>
                        </div>
                        <div className={styles.main}>
                            <div className={styles.meta}>
                                <span className={styles.user}><a href={`/user/${item.creator.id}`}>{item.creator.name}</a></span>
                                <span className={styles.date}><Time date={item.createdAt} /></span>
                                {item.likes > 0 && (
                                    <span className={styles.stat}><Icon type="like" /> <em>{item.likes}</em></span>
                                )}
                                {item.blocks > 0 && (
                                    <span className={styles.stat}><Icon type="block" /> <em>{item.blocks}</em></span>
                                )}
                                {props.showAction && (
                                    <span className={styles.floor}>#{ (page-1)*pageSize + index + 1}</span>
                                )}
                            </div>
                            <div className={styles.content}>
                                {item.parent && (item.parent.status == 'NORMAL' || item.parent.status == 'PENDING') && (
                                    <div className={styles.parent}>
                                        <div className={styles.refer}>引用 @{item.parent.creator.name} 的回复</div>
                                        <div>{item.parent.content}</div>
                                    </div>
                                )}
                                <div style={{ overflow: "hidden" }}>
                                    {item.content}
                                    {props.showAction && context && (
                                        <Action type="REPLY" entity={item} className={styles.action} >
                                            <a href="javascript:;" onClick={onReplyClick(item)}> <Icon type="reply" /> </a>
                                        </Action>
                                    )}
                                </div>
                                <AnimatePresence>
                                    {(reply && reply.id == item.id) && (
                                        <motion.div
                                            key={item.id}
                                            className={styles.addReply}
                                            initial={{ height: 0 }}
                                            animate={{ height: 'auto' }}
                                            exit={{ height: 0 }}
                                        >
                                            <div className={styles.inner}>
                                                <div className={styles.triangle}></div>
                                                <div className={styles.body}>
                                                    <Editor className={styles.editor} mode="simple" bordered onChange={onReplyChange(item)} minRows={2} />
                                                </div>
                                                <div className={styles.footer}>
                                                    <span className={styles.error}>{reply.error}</span>
                                                    <a href="javascript:;" className={styles.submit} onClick={onReplySubmit(item)}>发表</a>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}