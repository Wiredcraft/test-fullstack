import React from 'react';
import Widget from './index';
import util from '../../util';
import styles from './styles.less';

class PostWidget extends React.Component {
    static async getInitialProps(ctx) {
        const { type, topic, creator } = ctx.params;
        return {
            posts: await util.request.get('/api/postWidget', { type, topic, creator }, {
                headers: {
                    cookie: ctx.req.headers.cookie
                }
            })
        }
    }

    render() {
        const { title, posts = [] } = this.props;

        if (posts.length) {
            return (
                <Widget title={title} className={styles.post}>
                    <div>
                        <ul>
                            {posts.map(item => (
                                <li><a href={`/post/${item.id}`}>{item.title}</a></li>
                            ))}
                        </ul>
                    </div>
                </Widget>
            )
        }

        return null;
    }
}

export default PostWidget;