import React from 'react';
import classNames from 'classnames';
import Header from './Header';
import Footer from './Footer';
import { Auth } from 'Components'; 
import styles from './style.module.less';

export default class extends React.Component {
    render() {
        return (
            <Auth.Provider>
                <div {...this.props} className={classNames(styles.main, this.props.className)}>
                    <Header />
                    <div className={styles.body}>
                        <div className={styles.inner}>
                            {this.props.children}
                        </div>
                    </div>
                    <Footer />
                </div>
            </Auth.Provider>
        )
    }
}