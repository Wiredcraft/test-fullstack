import * as React from 'react';
import axios from '../../services/axios-service';

import {
  useSelector,
  useDispatch
} from 'react-redux';

import {
  useHistory,
  useParams
} from "react-router-dom";

import * as PageService from '../../services/page-service';

import BaseLayout from '../layouts/base-layout';


const Index = () => {
  const history = useHistory();
  const talks = useSelector((state: { talks: any }) => state.talks);
  const profile = useSelector((state: { profile: any }) => state.profile);
  const talkIds = Object.keys(talks);
  const urlPrefix = PageService.urlPrefix;
  const apiUrl = PageService.apiUrl;


  function showNew(event: React.MouseEvent) {
    try {
      history.push(`${urlPrefix}/talks/new`);
    } catch (error) {
      // console.log(error.message);
    }
  }

  function show(id: number) {
    try {
      history.push(`${urlPrefix}/talks/${id}`);
    } catch (error) {
      // console.log(error.message);
    }
  }

  function voteUp(id: number) {
    try {
      // console.log(profile.id);
      // console.log(talks[id].user_id);
      if (profile.id === talks[id].user_id) {
        axios.put(`${apiUrl}/api/talks/${id}/vote-up`)
          .then(function (response) {
            // console.log(response);
            history.push(`${urlPrefix}/talks`);
          })
          .catch(function (error) {
            // console.log(error);
          });
      }

      history.push(`${urlPrefix}/talks`);
    } catch (error) {
      // console.log(error.message);
    }
  }

  return (
    <BaseLayout>
        <div className="main-content">

          <div className="container">
            {talkIds.length === 0 &&
              <div className="subscribe-hint">
                <p>
                  There are no talks now. Please start you idea.
                </p>

                <button className="submit-btn" onClick={showNew}>Start Talk</button>
              </div>
            }

            {talkIds.length > 0 &&

              <ul className="talk-list">
                {talkIds.map((id: any, index) =>
                  <li key={index}>
                    <div className="title">
                      <i className="fa fa-caret-up" aria-hidden="true" onClick={() => voteUp(id)}></i>
                      <div className="text" onClick={() => show(id)}>
                        {talks[id].title}
                      </div>
                    </div>

                    <div className="sub-title">
                      <span className="time">{`${PageService.timeAgo(talks[id].created_at)}`}</span>
                    </div>
                  </li>
                )}
              </ul>
            }
          </div>

        </div>

    </BaseLayout>
  )
}


export default Index;
