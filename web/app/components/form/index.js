import React from 'react';
import Item from './item';
import styles from './style.less';

class Form extends React.Component {
    render() {
        return (
            <div className={`${styles.form} ${this.props.className}`}>
                {this.props.children}
            </div>
        )
    }
}

Form.Item =  Item;

export const Button = require('./button').default;
export default Form;