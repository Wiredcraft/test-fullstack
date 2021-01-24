import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PollsList from '../components/PollsList'

export class Home extends React.Component {
  render() {
    const { polls } = this.props;
    return !!polls ? (
      <div>
        <PollsList
          polls={polls}
          authed={this.props.authed}
          updatePollVote={this.props.updatePollVote}
        />
      </div>
    ) : (
      <div>No content.</div>
    )
  }
}

Home.propTypes = {
  authed: PropTypes.bool.isRequired,
}

export default connect(
  state => ({
    polls: state.polls.all.polls
  }), null)(Home);
