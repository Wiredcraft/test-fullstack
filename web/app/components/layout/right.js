import React from 'react';
import styles from './style.less';

class Right extends React.Component {
    render() {
        return (
            <div className={styles.right}>
                {this.props.children}
            </div>
        )
    }
}

export default Right;