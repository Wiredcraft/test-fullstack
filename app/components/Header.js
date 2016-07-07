import React, { PropTypes } from 'react';
import styles from '../less/header.less';

export default function Header(props) {
    return (
        <div className={styles.header}>
            <div className={styles.logo} onClick={props.onBackToIndex}>
                {props.logoText}
            </div>
            <div className={styles.status} onClick={props.onRedirect}>
                {props.status}
            </div>
        </div>
    );
}

Header.propTypes = {
    logoText: PropTypes.string,
    status: PropTypes.string,
    onBackToIndex: PropTypes.func,
    onRedirect: PropTypes.func
};