import React from 'react';
import { Panel, Service, Auth, Time } from 'Components';
import { Link, withRouter } from 'react-router-dom';
import styles from './style.module.less';
import classNames from 'classnames';

class Home extends React.Component {
    static contextType = Auth.Context;

    constructor(props) {
        super(props);

        this.state = {
            filters: {
                page: 1,
                pageSize: 10,
            },
        }
    }

    static getDerivedStateFromProps(props, state) {
        const query = new URLSearchParams(props.location.search);
        if (query.get('page') !== state.filters.page) {
            return {
                filters: {
                    ...state.filters,
                    page: query.get('page') || 1
                }
            }
        }
        return null;
    }

    onVote = (row) => {
        return () => {
            if (!this.context.user) {
                this.props.history.push('/login');
            } else {
                if (row.voted) {
                    return;
                }
                app.service.voteTalk({ talk: row.id })
                    .then(body => {
                        this.setState({
                            filters: {
                                ...this.state.filters,
                                _updatedAt: Date.now()
                            }
                        })
                    })
            }
        }
    }

    render() {
        const { page, pageSize } = this.state.filters;
        const loginUser = this.context.user && this.context.user.name;
        return (
            <Panel className={styles.talkPanel}>
                <Service dataSource={app.service.pageTalk} params={{ loginUser, ...this.state.filters }} callback={(data) => {
                    const { count = 0, rows = [] } = data || {};
                    if (count == 0) {
                        return (
                            <div className={styles.emptyList}>
                                There is no talk yet, <Link className={styles.btnAddTalk} to={{ pathname: '/addTalk' }}>Add Talk</Link>
                            </div>
                        )
                    }
                    return (
                        <div>
                            <ul className={styles.talkList}>
                                {rows.map(row => (
                                    <li>
                                        <div className={styles.left}>
                                            <div onClick={this.onVote(row)} className={classNames(styles.vote, row.voted ? styles.voted : '')}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 22h-24l12-20z" /></svg></div>
                                            <div>{row.points || 0}</div>
                                        </div>
                                        <div className={styles.right}>
                                            <p className={styles.title}>{row.title}</p>
                                            <p className={styles.desc}>{row.description}</p>
                                            <p className={styles.meta}>
                                                created by {row.createdBy.name} at <Time date={row.createdAt} />
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            {(count > (page*pageSize)) && (
                                <div className={styles.more}>
                                    <Link to={{ pathname: '/', search: `?page=${page+1}`}}>more...</Link>
                                </div>
                            )}
                        </div>
                    )
                }} />
            </Panel>
        )
    }
}

export default withRouter(Home);