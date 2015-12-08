import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Loader from '../../components/Loader/Loader';
import Topic from '../../components/Topic/Topic';
import * as TopicsActions from '../../actions/TopicsActions';
import * as RouteActions from '../../actions/RouteActions';
import { isLoggedIn } from '../../util/auth';
import { isLiked } from '../../util/topic';
import _ from 'lodash';

import classNames from 'classnames';
import styles from '../../scss/app.scss';
import stylesPriv from './_TopicContainer.scss';

@connect(
  state => ({ topics: state.topics, auth: state.auth }),
  dispatch => bindActionCreators(TopicsActions, dispatch)
)
export default class TopicContainer extends Component {

  _Loader(){
      return <div className={styles['center']}><Loader /></div>;
  }

  _Error(){
      return <div className={styles['center']}>Error loading Topics</div>;
  }

  _postNow(){
    RouteActions.goOr(isLoggedIn(this.props.auth), '/submit', '/auth');
  }

  _isEmpty(){
      return (
        <div className={classNames(styles['h2'], styles['center'])}>
            List is empty
            <div className={styles['center']}>
              <button className={stylesPriv['topic-list__btn']} onClick={::this._postNow}>POST NOW</button>
            </div>
        </div>
      )
  }

  _isOwned(id){
    return (this.props.auth.id === id);
  }

  _List(){
      let that = this;
      return _.map(_.sortByOrder(this.props.topics.topics, ['points'], ['desc']), (topic, key) => {
        return <Topic
                key={key}
                titleHandler={() => this.props.toggleTopic(topic)}
                likeHandler={() => this.props.toggleLikeTopic(topic, this.props.auth)}
                num={key + 1}
                liked={isLiked(topic, this.props.auth.id)}
                owned={that._isOwned(topic.userId)}
                {...topic} />
      });
  }

  componentDidMount() {
    this.props.getList();
  }

  render() {

    return (
      <div>
        {(this.props.topics.loading) && this._Loader()}
        {(this.props.topics.error) && this._Error()}
        {(this.props.topics.topics.length === 0 && !this.props.topics.error) && this._isEmpty()}
        {this._List()}
      </div>
    );
  }
}
