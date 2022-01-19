import React from 'react';
import styles from './style.less';

class Panel extends React.Component {
    render() {
        return (
            <div className={`${styles.panel} ${this.props.className}`}>
                <div className={styles.header}>
                    {this.props.title}
                </div>
                <div className={styles.body} style={{minHeight: this.props.minHeight}}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Panel;