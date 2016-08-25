import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchTalks, vote } from '../actions';
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
    if(this.props.talks.shouldFetch) {
      this.props.fetchTalks();
    } else {
      console.log('Talk list already there');  // TODO
    }
  }

  render = () => {
    if (this.props.talks.isFetching) {
      return <Loading/ >;
    } else {
      let list = this.props.talks.list.map((item, idx) => {
        item.vote = this.props.vote;
        return <Talk key={idx} {...item} />
      });
      return (
        <div>{list}</div>
      );
    }
  }
}

TalkList.propTypes = {
  talks: PropTypes.object.isRequired,
  fetchTalks: PropTypes.func.isRequired,
  vote: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    talks: state.talks,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    vote: talkId => dispatch(vote(talkId)),
    fetchTalks: () => dispatch(fetchTalks())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TalkList);
