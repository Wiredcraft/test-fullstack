import React, { Component } from 'react';
import { Loader, Header, Body, Topic } from '../../components/index';
import { TopicList, HeaderContainer } from '../../container/index';
import styles from '../../scss/app.scss';

export default class List extends Component {

  render() {
    return (
      <div className={styles.container}>
        <HeaderContainer />
        <Body>
            <TopicList {...this.props} />
        </Body>
      </div>
    );
  }
}
