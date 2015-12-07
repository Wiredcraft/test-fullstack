import React, { Component } from 'react';
import { Body } from '../../components/index';
import { HeaderContainer } from '../../container/index';
import styles from '../../scss/app.scss';

export default class NotFound extends Component {

  render() {
    return (
      <div className={styles.container}>
        <HeaderContainer />
        <Body>
            Not Found
        </Body>
      </div>
    );
  }
}
