import React from 'react';
import Icon from '../icon';
import Widget from './index';
import util from '../../util';
import styles from './styles.less';

class Stat extends React.Component {
  static async getInitialProps(ctx) {
    return {
      type: ctx.params.type,
      stat: await util.request.get('/api/statWidget', ctx.params, {
        headers: {
          cookie: ctx.req.headers.cookie
        }
      })
    }
  }

  render() {
    const { type, stat = {} } = this.props;

    if (type == 'user') {
      return (
        <Widget title="用户统计数据" className={styles.stat}>
          <div>
            <ul>
              <li>
                <label>主题数：</label><span>{stat.postCount}</span>
              </li>
              <li>
                <label>屏蔽主题数：</label><span>{stat.blockedPostCount}</span>
              </li>
              <li>
                <label>回复数：</label><span>{stat.replyCount}</span>
              </li>
              <li>
                <label>屏蔽回复数：</label><span>{stat.blockedReplyCount}</span>
              </li>
            </ul>
          </div>
        </Widget>
      )
    }

    if (type == 'site') {
      return (
        <Widget title="社区运行状况" className={styles.stat}>
          <div>
            <ul>
              <li>
                <label>用户数：</label><span>{stat.userCount}</span>
              </li>
              <li>
                <a href="/blocked/user">
                  <Icon type="goto" /><label>屏蔽用户数：</label><span>{stat.blockedUserCount}</span>
                </a>
              </li>
              <li>
                <label>主题数：</label><span>{stat.postCount}</span>
              </li>
              <li>
                <a href="/blocked/post">
                  <Icon type="goto" /><label>屏蔽主题数：</label><span>{stat.blockedPostCount}</span>
                </a>
              </li>
              <li>
                <label>回复数：</label><span>{stat.replyCount}</span>
              </li>
              <li>
                <a href="/blocked/reply">
                  <Icon type="goto" /><label>屏蔽回复数：</label><span>{stat.blockedReplyCount}</span>
                </a>
              </li>
            </ul>
          </div>
        </Widget>
      )
    }
  }
}

export default Stat;