import Icon from '../icon';
import Avatar from '../avatar';
import styles from './user.less';

export default function (props) {
    const { users = [] } = props;
    return (
        <ul>
            {users.map(user => (
                <li>
                    <div className={styles.user}>
                        <div className={styles.avatar}>
                            <a href={`/user/${user.id}`}>
                                <Avatar src={user.avatar} />
                            </a>
                        </div>
                        <div className={styles.main}>
                            <a href={`/user/${user.id}`}>
                                {user.name}
                            </a>
                        </div>
                        <div>
                            <span className={styles.stat}><Icon type="like" /> <em>{user.likes}</em></span>
                            <span className={styles.stat}><Icon type="block" /> <em>{user.blocks}</em></span>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}