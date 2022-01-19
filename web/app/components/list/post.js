import Time from '../time';
import Avatar from '../avatar';
import styles from './style.less';

export default function (props) {
    const { posts = [] } = props;
    return (
        <ul>
            {posts.map(post => (
                <li>
                    <div className={`${styles.post} ${styles[post.status]}`}>
                        <div className={styles.avatar}>
                            <a href={`/user/${post.creator.id}`}>
                                <Avatar src={post.creator.avatar} />
                            </a>
                        </div>
                        <div className={styles.main}>
                            <div className={styles.title}>
                                <a href={`/post/${post.id}`}>{post.title}</a>
                            </div>
                            <div className={styles.meta}>
                                {post.topic && (
                                    <>
                                        <span><a className={styles.topic} href={`/topic/${post.topic.id}`}>{post.topic.name}</a></span><span className={styles.dot}>•</span>
                                    </>
                                )}
                                <span><a className={styles.user} href={`/user/${post.creator.id}`}>{post.creator.name}</a></span><span className={styles.dot}>•</span>
                                <span><Time date={post.createdAt} /></span>
                                {post.lastReplyBy && (
                                    <>
                                        <span className={styles.dot}>•</span>
                                        <span>最后回复 <a className={styles.user} href={`/user/${post.lastReplyBy.id}`}>{post.lastReplyBy.name}</a> </span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className={styles.stat}>
                            <a href={`/post/${post.id}`}>{post.replies}</a>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}