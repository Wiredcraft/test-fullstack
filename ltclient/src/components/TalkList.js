import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTalks } from '../actions';
import Loading from './Loading';

import Talk from './Talk';

// TODO to remove
var testData = [
  {
    title: 'How to beat procratination',
    speaker: 'Jon Snow',
    cover: 'http://carlog.qiniudn.com/starry-night.jpg',
    description: 'Jon talks about how to beat procratination',
    submitter: 'bob',
    createdAt: '3 days ago',
    upvote: 233,
  },
  {
    title: 'How to beat procratination',
    speaker: 'Jon Snow',
    cover: 'http://carlog.qiniudn.com/starry-night.jpg',
    description: 'Jon talks about how to beat procratination',
    submitter: 'alice',
    createdAt: '2 hours ago',
    upvote: 56,
  }
];

class TalkList extends Component {

  componentDidMount = () => {
    this.props.dispatch(fetchTalks());
  }

  render = () => {
    if (this.props.talks.isFetching) {
      return <Loading/ >;
    } else {
      const list = this.props.talks.list.map((item, idx) => {
        return <Talk key={idx} {...item} />
      });
      return (
        <div>{list}</div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    talks: state.talks,
  };
}

export default connect(mapStateToProps)(TalkList);