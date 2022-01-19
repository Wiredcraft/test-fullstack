import React from 'react';
import styles from './style.less';

class Item extends React.Component {
    render() {
        return (
            <div className={`${styles.item} ${this.props.className}`}>
                <label>{this.props.label} </label>
                <div className={styles.input}>
                    {this.props.children}
                </div>
                {this.props.error && (
                    <div className={styles.error}>
                        {this.props.error}
                    </div>
                )}
            </div>
        )
    }
}

export default Item;