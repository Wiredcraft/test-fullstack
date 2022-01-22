import React from 'react';
import classNames from 'classnames';
import Context from './Context';
import styles from './style.module.less';

export default class extends React.Component {
    static contextType = Context.Context;

    decorateInput = (children) => {
        const { values, onValuesChange } = this.context; 
        this.fields = [];
        return React.Children.map(children, child => {
            if (React.isValidElement(child)) {
                const { field, attrs = {}, children } = child.props;
                if (field) {
                    this.fields.push(field);
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
                    return React.cloneElement(child, { children: this.decorateInput(children) });
                }
            }
            return child;
        });
    }

    render() {
        const { errors = {} } = this.context; 
        return (
            <div className={classNames(styles.field, this.props.className)} data-field={this.props.label}>
                <div className={styles.content}>
                    <div className={styles.label}>
                        <label>{this.props.label}</label>
                    </div>
                    <div className={styles.input}>
                        {this.decorateInput(this.props.children)}
                    </div>
                </div>
                <div className={styles.error}>
                   {this.fields.map(field => errors[field]).join(',')}
                </div>
            </div>
        )
    }
}
