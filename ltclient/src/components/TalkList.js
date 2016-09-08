import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchTalks, vote } from '../actions';
import Loading from './Loading';

import Talk from './Talk';

class TalkList extends Component {

  componentDidMount = () => {
    if (this.props.talks.shouldFetch) {
      this.props.fetchTalks();
    } else {
      console.log('Talk list already there');  // TODO
    }
  }

  render = () => {
    if (this.props.talks.isFetching) {
      return <Loading />;
    }
    let list = this.props.talks.list.map((item, idx) => {
      item.vote = this.props.vote;
      return <Talk key={idx} {...item} />;
    });
    return (
      <div>{list}</div>
    );
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
    fetchTalks: () => dispatch(fetchTalks()),
  };
}

export { TalkList };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TalkList);
