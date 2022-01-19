import React from 'react';
import _ from 'lodash';
import Widget from './index';
import util from '../../util';
import styles from './styles.less';

class TopicWidget extends React.Component {
    static async getInitialProps(ctx) {
        return {
            topics: await util.request.get('/api/topicWidget', { type: ctx.params.type }, {
                headers: {
                    cookie: ctx.req.headers.cookie
                }
            })
        }
    }

    render() {
        const { title, topics = [], showTotal } = this.props;
        return (
            <Widget
                className={styles.topic}
                title={(
                    <div className={styles.title}>
                        {showTotal && (<a href="/topics">全部</a>)}
                        <h3>{title}</h3>
                    </div>
                )}
            >
                <div>
                    <ul>
                        {_.take(topics, 10).map(item => (
                            <li><a href={`/topic/${item.id}`}>{item.name}</a></li>
                        ))}
                    </ul>
                </div>
            </Widget>
        )
    }
}

export default TopicWidget;