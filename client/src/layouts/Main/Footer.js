import React from 'react';
import styles from './style.module.less';

class Footer extends React.Component {
    render() {
        return (
            <div className={styles.footer}>
                <div className={styles.inner}>
                        <ul>
                            <li><a href="/">About</a></li>
                            <li><a href="/">Rule</a></li>
                            <li><a href="/">Corpperate</a></li>
                            <li><a href="/">API</a></li>
                        </ul>
                        <p>@LightingTalk 2020~2022</p>
                </div>
            </div>
        )
    }
}

export default Footer;