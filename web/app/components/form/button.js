import React from 'react';
import styles from './style.less';

class Button extends React.Component {
    render() {
        return (
            <a href="javascript:;" className={`${styles.button} ${this.props.type == "primary" && styles.primary}`} onClick={this.props.onClick} >
                {this.props.children}
            </a>
        )
    }
}

export default Button;