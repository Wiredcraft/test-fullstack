import React from 'react';
import styles from './style.less';

class Left extends React.Component {
    render() {
        return (
            <div className={styles.left}>
                {this.props.children}
            </div>
        )
    }
}



export default Left;