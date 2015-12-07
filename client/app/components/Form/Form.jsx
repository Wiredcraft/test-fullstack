import React, { Component } from 'react';
import styles from './_Form.scss';
import classNames from 'classnames';
import Loader from '../Loader/Loader';

class Form extends Component {

  _submit(){
    let that = this;
    switch(this.props.mode){
      case 'auth':
        this.props.submitAuth({
          username: that.refs.username.value,
          password: that.refs.password.value,
        });
      break;
      case 'topic':
        this.props.submitTopic({
          title: that.refs.title.value,
          content: that.refs.content.value,
        });
      break;
    }
  }

  _auth(){

    let { error, loading } = this.props;

    return (
      <div>
        <input type="text" ref="username" placeholder="Username" className={classNames(styles['form__field'], styles['sm-col-12'], styles['md-col-10'], styles['lg-col-10'])} />
        <input type="password" ref="password" placeholder="Password" className={classNames(styles['form__field'], styles['sm-col-12'], styles['md-col-10'], styles['lg-col-10'])} />
        {(error) && <div>Error</div>}
        <div className={styles['col-10']}>
          <button type="submit" className={styles['form__btn']} disabled={loading}>Sign Up {(loading) && <Loader color={'white'} size={14} />}</button>
        </div>
      </div>
    )
  }

  _topic(){

    let { username, error, loading } = this.props;

    return (
      <div>
        <input type="text" ref="username" defaultValue={username} readOnly className={classNames(styles['form__field'], styles['form__field--disabled'], styles['sm-col-12'], styles['md-col-10'], styles['lg-col-10'])} />
        <input type="text" ref="title" placeholder="Title" className={classNames(styles['form__field'], styles['sm-col-12'], styles['md-col-10'], styles['lg-col-10'])} />
        <textarea ref="content" placeholder="Content" className={classNames(styles['form__field'], styles['form__field--area'], styles['sm-col-12'], styles['md-col-10'], styles['lg-col-10'])} />
        {(error) && <div>Error</div>}
        <div className={styles['col-10']}>
          <button type="submit" className={styles['form__btn']} disabled={loading}>Submit {(loading) && <Loader color={'white'} size={14} />}</button>
        </div>
      </div>
    )
  }

  render() {

    let mode = this.props.mode;

    return (
        <form className={styles.form} onSubmit={::this._submit}>
            {(mode === 'auth') && this._auth()}
            {(mode === 'topic') && this._topic()}
        </form>
    );
  }
}

Form.defaultProps = {
  submitAuth: (obj) => {
    console.log('submit', obj);
  },
  submitTopic: (obj) => {
    console.log('submit', obj);
  },
  error: true,
  loading: false,
  mode: 'topic',
  username: 'theotow'
};

Form.propTypes = {
  submitAuth: React.PropTypes.func,
  submitTopic: React.PropTypes.func,
  error: React.PropTypes.bool,
  loading: React.PropTypes.bool,
  mode: React.PropTypes.string,
  username: React.PropTypes.string
};

export default Form;
