import React from 'react';
import styles from './style.less';

class Footer extends React.Component {
    render() {
        return (
            <div className={styles.footer}>
                <div className={styles.inner}>
                        <ul>
                            <li><a href="/guide">关于</a></li>
                            <li><a href="/rule">规则</a></li>
                            <li><a href="javascript:;">合作</a></li>
                            <li><a href="javascript:;">API</a></li>
                        </ul>
                        <p>Leading People Together,  将志同道合的人聚在一起</p>
                </div>
            </div>
        )
    }
}

export default Footer;