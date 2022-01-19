/* eslint-disable react-hooks/exhaustive-deps */
import React, {ReactElement, useEffect, useState} from 'react';
import {AppDispatch} from 'src/store';
import Centered from '../../components/centered';
import Container from '../../components/container';
import {IAPITalksState} from '../../interfaces/IAPI';
import {IAppState} from '../../interfaces/IRootState';
import {ITalkObject} from '../../interfaces/ITalk';
import PropTypes from 'prop-types';
import TalkButtons from './Talk/Buttons';
import TalkContainer from './Talk/Container';
import TalkContent from './Talk/Content';
import TalkRanking from './Talk/Ranking';
import TalkVote from './Talk/Vote';
import {api} from '../../actions';
import {connect} from 'react-redux';
import {getCookie} from '../../utils/cookies';

interface TalksProps {
  apiTalksVoteReducer: any;
  apiTalksDeleteReducer: any;
  apiTalksListReducer: IAPITalksState;
  dispatch: AppDispatch;
}

/**
  * Talks component.
  * @param {object} props - Component props
  * @return {ReactElement}
 */
function Talks(props: TalksProps): ReactElement {
  const sortTalks = (talks: ITalkObject[]): ITalkObject[] => {
    return (talks.map((talk) => {
      if (!talk.rating) {
        talk.rating = 0;
      }
      return talk;
    })).sort((a, b)=> {
      return b.rating - a.rating;
    });
  };

  const fetchTalks = (props: TalksProps): void => {
    props.dispatch(api.talks.apiTalksListAction(getCookie('token')));
  };

  const [talkList, setTalkList] = useState<ITalkObject[]>([]);

  useEffect(() => {
    fetchTalks(props);
  }, []);


  useEffect(() => {
    setTalkList(
        sortTalks(Object.values(props.apiTalksListReducer.response)),
    );
  }, [props.apiTalksListReducer]);

  useEffect(() => {
    fetchTalks(props);
  }, [
    props.apiTalksVoteReducer.response,
    props.apiTalksDeleteReducer.response,
  ]);

  return (
    <div className='talks'>
      {talkList.length === 0 ?
      <Container>
        <Centered>
          {props.apiTalksListReducer.loading ? 'Loading...' :
          ` No talks in the list.
          Be the first one to talk - take the initiative 
          and create one Lightning Talk ! 
          Just a name and a description are required. 🎤`}
        </Centered>
      </Container>:(Object.values(
          talkList,
      )).map((talk: ITalkObject) => {
        return (
          <TalkContainer key={talk._id}>
            <TalkRanking ranking={talk.rating} />
            <TalkVote id={talk._id} fetchTalks={fetchTalks} />
            <TalkContent talk={talk} />
            <TalkButtons talk={talk} />
          </TalkContainer>
        );
      })}
    </div>
  );
}

Talks.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: IAppState) => {
  return {
    apiTalksVoteReducer: state.apiTalksVoteReducer,
    apiTalksListReducer: state.apiTalksListReducer,
    apiTalksDeleteReducer: state.apiTalksDeleteReducer,
  };
};

export default connect(mapStateToProps)(Talks);
