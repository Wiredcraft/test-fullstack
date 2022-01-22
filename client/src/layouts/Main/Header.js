import React from 'react';
import { Auth } from 'Components';
import { Link, withRouter } from 'react-router-dom';
import styles from './style.module.less';

class Header extends React.Component {
    static contextType = Auth.Context;

    onLogout = () => {
        app.storage.remove('user');
        app.storage.remove('authToken');
        this.context.notifyUserChange();
        this.props.history.push("/");
    }

    render() {
        const { user } = this.context;
        return (
            <div className={styles.header}>
                <div className={styles.inner}>
                    <Link to={{ pathname: "/" }} className={styles.logo}>
                        <img src={require('Assets/logo.png').default} />
                    </Link>
                    <h1 className={styles.title}>Lighting Talk</h1>
                    {!user && (
                        <>
                            <Link to={{ pathname: '/register' }}>register</Link>
                            <span className={styles.sep}>|</span>
                            <Link to={{ pathname: '/login' }}>login</Link>
                        </>
                    )}
                    {user && (
                        <>
                            <Link to={{ pathname: '/addTalk'}}>add Talk</Link>
                            <span className={styles.sep}>|</span>
                            <Link to={{ pathname: '/' }}>{user.name}</Link>
                            <span className={styles.sep}>|</span>
                            <Link onClick={this.onLogout}>logout</Link>
                        </>
                    )}
                </div>
            </div>
        )
    }
}

export default withRouter(Header);