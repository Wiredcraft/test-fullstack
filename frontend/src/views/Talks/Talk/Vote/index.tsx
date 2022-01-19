import {IAppState, IOwnProps} from '../../../../interfaces/IRootState';
import React, {ReactElement} from 'react';
import {AppDispatch} from '../../../../store';
import PropTypes from 'prop-types';
import VoteButton from './Button';
import {api} from '../../../../actions';
import {connect} from 'react-redux';
import {getCookie} from '../../../../utils/cookies';

interface VoteProps {
    id: string;
    fetchTalks: (props: any) => void;
    dispatch: AppDispatch;
}

const Vote = (
    props: VoteProps,
): ReactElement => {
  const handleVote = (talkID: string, vote: number): void => {
    props.dispatch(api.vote.apiVotePostAction(
        getCookie('token'),
        {
          talk_id: talkID,
          vote,
        },
    ));
  };


  return (
    <div style={{
      flex: '1 0 auto',
      margin: '10px',
      alignContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }}>
      <VoteButton onClick={handleVote} id={props.id} vote={+1}>Up</VoteButton>
      <VoteButton onClick={handleVote} id={props.id} vote={0}>-</VoteButton>
      <VoteButton onClick={handleVote} id={props.id} vote={-1}>Down</VoteButton>
    </div>
  );
};

Vote.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = ( state: IAppState, _ownProps: IOwnProps) => {
  return {
    voteReducer: state.apiTalksVoteReducer,
  };
};

export default connect(mapStateToProps)(Vote);

