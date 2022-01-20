import React from 'react';
import styles from './style.module.less';

export default class extends React.Component {
    render() {
        return (
            <div className={styles.header}>
                <div className={styles.inner}>
                    <a className={styles.logo}>
                        <img />
                    </a>
                    <div style={{ flex: 1}}>
                    </div>
                    <a></a>
                </div>
            </div>
        )
    }
}