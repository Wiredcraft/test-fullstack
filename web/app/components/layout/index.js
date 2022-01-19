import React from 'react';
import Head from 'next/head';
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { LoginContext } from '../context';
import Header from '../header';
import Footer from '../footer';
import Left from './left';
import Right from './right';
import Effect from './effect';
import util from '../../util';
import styles from './style.less';

class Layout extends React.Component {
    static async getInitialProps(ctx) {
        return util.request.get('/api/layout', {}, {
            headers: {
                cookie: ctx.req.headers.cookie
            }
        })
    }

    constructor(props) {
        super(props);

        this.state = {
            messages: []
        }
    }

    showMessage(message) {
        const key = Date.now();
        this.setState({
            messages: [ ...this.state.messages, { key, content: message } ]
        });
        setTimeout(() => {
            const messages = this.state.messages.slice();
            messages.splice(messages.findIndex(item => item.key), 1);
            this.setState({ messages })
        }, 3000)
    }

    componentDidMount() {
        window.addEventListener('appmessage', e => {
            this.showMessage(e.detail.message);
        })

        window.addEventListener('unhandledrejection', e => {
            this.showMessage(e.reason.message);
        });
    }

    render() {
        return (
            <>
                <LoginContext.Provider value={this.props.user}>
                    <Head>
                        <title>乌托邦—理想者的社区</title>
                        <link rel="icon" href="/assets/planet.svg" />
                        <meta name="viewport" content="width=device-width,initial-scale=0.85,maximum-scale=0.85,minimum-scale=0.75,user-scalable=no" />
                    </Head>
                    <Header curTopic={this.props.curTopic} topics={this.props.topics} />
                    <AnimatePresence>
                        {this.state.messages.map(item => (
                            <motion.div 
                                key={item.key} 
                                className={styles.message}
                                initial={{ opacity: 0, transform: "translate(-50%, 50%)" }}
                                animate={{ opacity: 1,  transform: "translate(-50%, 100%)" }}
                                exit={{ opacity: 0, transform: "translate(-50%, 50%)" }}
                                transition={{ type: 'tween'}}
                            >
                                {item.content}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <div className={styles.main}>
                        <div className={styles.inner}>
                            {this.props.children}
                        </div>
                    </div>
                    <Footer />
                    <Effect />
                    <script type="text/javascript" src={`https://s4.cnzz.com/z_stat.php?id=1279027917&web_id=1279027917`}></script>
                </LoginContext.Provider>
            </>
        )
    }
}

Layout.Left = Left;
Layout.Right = Right;

export default Layout;