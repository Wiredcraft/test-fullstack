import * as React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';

import { FilteredBy } from './filtered-by';
import { EmptyListing } from './empty-listing';
import { Store } from '../../store/store-provider';
import { CONFIG } from '../../constants/config';
import { TalkCard } from './talk-card';

const TalkListingStyled = styled.div``;

export const TalkListing = () => {
  const { state, dispatch } = React.useContext(Store);
  const [filterBy, updateFilterBy] = React.useState();

  // Cache loadTalks
  const loadTalks = React.useCallback(
    filter => {
      let query = '';
      if (filter) {
        query = `?${queryString.stringify(filter)}`;
        updateFilterBy(filter);
      }

      axios
        .get(`${CONFIG.apiServer}/talks${query}`, {
          headers: { Authorization: `Bearer ${state.userInfo.accessToken}` }
        })
        .then(resp => {
          if (resp.status === 200) {
            dispatch({ type: 'UPDATE_TALKS', payload: resp.data });
          }
        })
        .catch(err => {
          dispatch({ type: 'ERROR', payload: err });
        });
    },
    [dispatch]
  );

  React.useEffect(() => {
    loadTalks();
  }, [dispatch]);

  return (
    <TalkListingStyled>
      <FilteredBy filterInfo={filterBy} />
      {state && state.talks.length > 0 ? (
        state.talks.map(t => (
          <TalkCard key={t.id} talk={t} loadTalks={loadTalks} />
        ))
      ) : (
        <EmptyListing>
          No talks, tap (+) on the right bottom corner to create a new Lightning Talk
        </EmptyListing>
      )}
    </TalkListingStyled>
  );
};
