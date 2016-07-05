import React, { PropTypes } from 'react';
import styles from '../../less/common.less';

export default function BusySpinner(props) {
    let element = (<div></div>);
    if (props.busy) {
        element = (
            <div className={styles.spinner}>
                <div className={styles.icon}/>
            </div>
        );
    }
    return element;
}

BusySpinner.propTypes = {
    busy: PropTypes.bool
};