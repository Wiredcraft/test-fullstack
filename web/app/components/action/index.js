import React from 'react';
import Icon from '../icon';
import util from '../../util';
import styles from  './style.less';

class Action extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            type: props.type,
            entity: props.entity
        }
    }

    relations = {
        "POST": {
            "LIKE": "LIKE_POST",
            "BLOCK": "BLOCK_POST"
        },
        "USER": {
            "LIKE": "LIKE_USER",
            "BLOCK": "BLOCK_USER"
        },
        "REPLY": {
            "LIKE": "LIKE_REPLY",
            "BLOCK": "BLOCK_REPLY"
        }
    }

    onLikeClick = e => {
        const { clientX, clientY } = e;
        const { type, entity } = this.state;

        if (entity.blocked) {
            return ;
        }

        if (entity.liked) {
            window.dispatchEvent(new CustomEvent('like', { detail: { clientX, clientY } }));
            return;
        }

        util.request.post('/api/relation', {
            type: this.relations[type]['LIKE'],
            target: entity.id
        }).then(body => {
            this.setState({
                entity: {
                    ...this.state.entity,
                    liked: true
                }
            })
            window.dispatchEvent(new CustomEvent('like', { detail: { clientX, clientY } }));
        })
    }

    onBlockClick = e => {
        const { clientX, clientY } = e;
        const { type, entity } = this.state;

        if (entity.liked) {
            return ;
        }

        if (entity.blocked) {
            window.dispatchEvent(new CustomEvent('block', { detail: { clientX, clientY } }));
            return;
        }

        util.request.post('/api/relation', {
            type: this.relations[type]['BLOCK'],
            target: entity.id
        }).then(body => {
            this.setState({
                entity: {
                    ...this.state.entity,
                    blocked: true
                }
            })
            window.dispatchEvent(new CustomEvent('block', { detail: { clientX, clientY } }));
        })
    }

    computeClassName = (field) => {
        return this.state.entity[field] ? styles.selected : '';
    }

    shouldAnimate = (field) => {
        const { entity } = this.state;

        if (!entity.liked && !entity.blocked) {
            return true;
        }

        if (entity[field]) {
            return true;
        }

        return false;
    }

    render() {
        return (
            <div {...this.props} className={`${this.props.className} ${styles.actions}`}>
                <a className={this.computeClassName('liked')} href="javascript:;" onClick={this.onLikeClick} ><Icon type="like" animate={this.shouldAnimate('liked')} /></a>
                <a className={this.computeClassName('blocked')} href="javascript:;" onClick={this.onBlockClick}><Icon type="block" animate={this.shouldAnimate('blocked')} /></a>
                {this.props.children}
            </div>
        )
    }
}

export default Action;