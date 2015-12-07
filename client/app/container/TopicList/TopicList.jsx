import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Loader, Topic } from '../../components/index';
import * as TopicsActions from '../../actions/TopicsActions';

import classNames from 'classnames';
import styles from '../../scss/app.scss';
import stylesPriv from './_TopicList.scss';

@connect(
  state => ({ topics: state.topics, auth: state.auth }),
  dispatch => bindActionCreators(TopicsActions, dispatch)
)
export default class TopicList extends Component {

  _Loader(){
      return (this.props.topics.loading) ? <div className={styles['center']}><Loader /></div> : '';
  }

  _isEmpty(){
    if(this.props.topics.topics.length === 0){
      return (
        <div className={classNames(styles['h2'], styles['center'])}>
            List is empty
            <div className={styles['center']}>
              <button className={stylesPriv['topic-list__btn']}>POST NOW</button>
            </div>
        </div>
      )
    }
  }

  _isOwned(id){
    return (this.props.auth.id === id);
  }

  // open close
  // like

  _List(){
      let that = this;
      return _.map(_.sortByOrder(this.props.topics.topics, ['points'], ['desc']), (item, key) => {
        return <Topic key={key} {...item} num={key + 1} owned={that._isOwned(item.authorId)} />
      });
  }

  render() {

    return (
      <div>
        {this._Loader()}
        {this._isEmpty()}
        {this._List()}
      </div>
    );
  }
}
