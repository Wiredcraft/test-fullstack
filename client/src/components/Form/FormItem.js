import React from 'react';
import Context from './Context';
import styles from './style.less';

export default class extends React.Component {
    static contextType = Context.Context;

    decorate = (children) => {
        const { values, onValuesChange } = this.context; 

        return React.Children.map(children, child => {
            if (React.isValidElement(child)) {
                const { field, attrs, children } = child.props;
                if (field) {
                    return React.cloneElement(child, {
                        value: values[field],
                        onChange: (val) => {
                            val = val.target.value;
                            if (onValuesChange) {
                                onValuesChange({[field]: val})
                            }
                        },
                    })
                } else {
                    return React.cloneElement(child, { children: this.decorate(children) });
                }
            }
            return child;
        });
    }

    render() {
        return (
            <div className={styles.field} data-field={this.props.label}>
                <div className={`${styles.label} ${this.props.required ? styles.required : ''}`}>
                    <label>{this.props.label}</label>
                </div>
                <div className={styles.input}>
                    {this.decorate(this.props.children)}
                </div>
                <div className={styles.error}>
                    {this.props.error}
                </div>
            </div>
        )
    }
}
