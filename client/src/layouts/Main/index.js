import React from 'react';
import classNames from 'classnames';
import Header from './Header';
import Footer from './Footer';
import styles from './style.module.less';

export default class extends React.Component {
    render() {
        return (
            <div {...this.props} className={classNames(styles.main, this.props.className)}>
                <Header />
                <div className={styles.content}>
                    {this.props.children}
                </div>
                <Footer />
            </div>
        )
    }
}