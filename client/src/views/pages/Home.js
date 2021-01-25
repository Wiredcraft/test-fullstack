import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import moment from 'moment'
// import { mapTime } from '../../core/helpers';

// Styles
import { PollsWrapper, PollTitle, PollMeta, PollMetaElement } from '../../scss/poll';


const Home = props => {
  const { polls, loading } = props;
  return !!loading && polls && polls.length ? (
    <PollsWrapper>
      {polls.map(item => (
        <li key={item._id}>
          
          <PollTitle>
            <button> { item.votes } </button>
            <strong> { item.title } </strong>
           </PollTitle>
          <PollMeta>
            <PollMetaElement>By: {item.user_name}</PollMetaElement>
            <PollMetaElement>{moment(item.date_created).fromNow()}</PollMetaElement>
          </PollMeta>
        </li>
      ))}
    </PollsWrapper>
  ) : (
    <div style={{padding: "1rem"}}>No content.</div>
  )
}

export default Home;
