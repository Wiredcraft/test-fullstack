import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
// Styles
import { PollTitle, PollMeta, PollMetaElement } from '../../scss/poll';

// import { mapTime } from '../../core/helpers';
import PollsList from '../components/PollsList'

const Home = props => {
  const { polls, loading } = props;
  return !!loading && polls && polls.length ? (
    <ul>
      {polls.map(item => (
        <li key={item._id}>
          <button> Vote {item.votes} </button>
          <PollTitle>{item.title}</PollTitle>
          <PollMeta>
            <PollMetaElement>By: {item.user_name}</PollMetaElement>
            <PollMetaElement>{moment(item.date_created).fromNow()}</PollMetaElement>
          </PollMeta>
        </li>
      ))}
    </ul>
  ) : (
    <div style={{padding: "1rem"}}>No content.</div>
  )
}

export default Home;
