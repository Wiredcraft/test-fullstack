import React from 'react';
import styles from './styles.less';

class Widget extends React.Component {
    render() {
        return (
            <div className={`${styles.widget} ${this.props.className}`}>
                <div className={styles.header}>
                    {this.props.title}
                </div>
                <div className={styles.body}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Widget;