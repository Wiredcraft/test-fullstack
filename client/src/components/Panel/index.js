import React from 'react';
import classNames from 'classnames';
import styles from './style.module.less';

class Panel extends React.Component {
    render() {
        return (
            <div className={classNames(styles.panel, this.props.className)}>
                {this.props.title && (
                    <div className={styles.header}>
                        {this.props.title}
                    </div>
                )}
                <div className={styles.body} style={{minHeight: this.props.minHeight}}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Panel;