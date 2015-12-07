import React, { Component } from 'react';
import classNames from 'classnames';
import { Loader, Header, Body, Topic, Form } from '../../components/index';
import { HeaderContainer } from '../../container/index';
import styles from '../../scss/app.scss';

export default class Submit extends Component {

  render() {
    return (
      <div className={styles.container}>
        <HeaderContainer />
        <Body>
          <div className={styles.clearfix}>
              <div className={classNames(styles['col'], styles['sm-col-12'], styles['lg-col-6'], styles['md-col-6'])}>
                <h2 className={styles['h2']}>Post Topic</h2>
                <Form />
              </div>
          </div>
        </Body>
      </div>
    );
  }
}
