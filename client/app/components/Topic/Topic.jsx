import React, { Component } from 'react';
import styles from './_Topic.scss';
import classNames from 'classnames';
import TimeAgo from 'react-timeago';


class Topic extends Component {

  render() {
    const {
      props: {
        num,
        title,
        author,
        time,
        liked,
        points,
        owned,
        open,
        text,
        likeHandler,
        titleHandler
      },
      _timeTransfrom
    } = this;

    return (
      <div className={classNames({
          [styles.topic]: true,
          [styles['topic--owned']]: owned
        })}>
          <div className={styles['topic__wrap']}>
            <div className={styles['topic__top']}>
              <div className={styles['topic__num']}>{num}.</div>
              <div className={styles['topic__title']} onClick={titleHandler}>{title}</div>
            </div>
            <div className={classNames({
                [styles['topic__text']]: true,
                [styles['topic__text--open']]: open
              })}>
              <div className={styles['topic__text-inner']}>{text}</div>
            </div>
            <div className={styles['topic__bottom']}>
                <div className={classNames({
                    [styles['topic__heart']]: true,
                    [styles['topic__heart--active']]: liked
                  })} onClick={likeHandler}></div>
                <div className={styles['topic__points']}><strong>{points}</strong> points</div>
                <div className={styles['topic__timefrom']}><TimeAgo date={new Date(time)} /> / {author}</div>
            </div>
          </div>
      </div>
    );
  }
}

Topic.defaultProps = {
  num: 10,
  title: 'Test',
  author: 'Manuel Villing',
  time: '2012.08.10',
  points: 100,
  liked: true,
  likeHandler: () => {
    console.log('handle like');
  },
  titleHandler: () => {
    console.log('handle title');
  },
  text: 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  open: true,
  owned: true
};

Topic.propTypes = {
  num: React.PropTypes.number,
  title: React.PropTypes.string,
  author: React.PropTypes.string,
  time: React.PropTypes.string,
  points: React.PropTypes.number,
  liked: React.PropTypes.bool,
  owned: React.PropTypes.bool,
  open: React.PropTypes.bool,
  text: React.PropTypes.string,
  likeHandler: React.PropTypes.func,
  titleHandler: React.PropTypes.func
};

export default Topic;
