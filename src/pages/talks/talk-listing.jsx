import * as React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { Store } from '../../store/store-provider';
import { CONFIG } from '../../constants/config';
import { TalkCard } from './talk-card';
// import { talks } from './talks';

const TalkListingStyled = styled.div``;

export const TalkListing = () => {
  const { state, dispatch } = React.useContext(Store);

  // Cache loadTalks
  const loadTalks = React.useCallback(() => {
    axios
      .get(`${CONFIG.apiServer}/talks`)
      .then(resp => {
        if (resp.status === 200) {
          dispatch({ type: 'UPDATE_TALKS', payload: resp.data });
        }
      })
      .catch(err => {
        dispatch({ type: 'ERROR', payload: err });
      });
  }, [dispatch]);

  React.useEffect(() => {
    loadTalks();
  }, [dispatch]);

  return (
    <TalkListingStyled>
      {state && state.talks.map(t => <TalkCard key={t.id} talk={t} />)}
    </TalkListingStyled>
  );
};
