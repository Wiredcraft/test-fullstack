import classNames from 'classnames';
import React from 'react';
import Context from './Context';
import FormItem from './FormItem';
import styles from './style.less';

class Form extends React.Component {
    render() {
        return (
            <form {...this.props} className={classNames(styles.form, this.props.className)} >
                <Context.Provider values={...this.props}>
                    {this.props.children}
                </Context.Provider>
            </form>
        )
    }
}

Form.Item = FormItem;

Form.defaultProps = {
    values: {},
    errors: {},
    onValuesChange: () => { },
};

export default Form;