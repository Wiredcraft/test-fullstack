import React from 'react';
import { LoginContext } from '../context';
import Widget from './index';
import Icon from '../icon';
import Action from '../action';
import util from '../../util';
import styles from './styles.less';

class User extends React.Component {
    static contextType = LoginContext;
    static async getInitialProps(ctx) {
        return {
            user: await util.request.get('/api/userWidget', { id: ctx.params.id }, {
                headers: {
                    cookie: ctx.req.headers.cookie
                }
            })
        }
    }

    render() {
        const { user } = this.props;
        return (
            <Widget title="作者" className={styles.user}>
                <div className={styles.main}>
                    <div className={styles.avatar}>
                        <a><img src={`/avatars/${user.avatar}`} /></a>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.meta}>
                            <a href={`/user/${user.id}`} className={styles.name}>{user.name}</a>
                            {this.context && (
                                <Action type="USER" entity={user} className={styles.action} />
                            )} 
                        </div>
                        <div className={styles.stat}>
                            {user.likes > 0 && <span className={styles.stat}><Icon type="like" /> <em>{user.likes}</em></span>}
                            {user.blocks > 0 && <span className={styles.stat}><Icon type="block" /> <em>{user.blocks}</em></span>}
                        </div>
                    </div>
                </div>
            </Widget>
        )
    }
}

export default User;