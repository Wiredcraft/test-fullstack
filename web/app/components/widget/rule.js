import React from 'react';
import Widget from './index';
import styles from './styles.less';

class Rule extends React.Component {
  render() {
      return (
        <Widget title="社区运行规则" className={styles.rule}>
          <div>
            <ul>
              <li>
                  1. 社区用户可以发布任何自己喜欢的主题
              </li>
              <li>
                  2. 社区用户可以抵制任何自己反感的主题，评论或者用户
              </li>
              <li>
                  3. 任何被抵制比例达到约30%的主题，评论，或者用户将会被屏蔽
              </li>
            </ul>
          </div>
        </Widget>
      )
  }
}

export default Rule;