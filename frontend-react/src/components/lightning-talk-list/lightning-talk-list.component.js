import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import './lightning-talk-list.component.css';
import { useForceUpdate } from '../../utils/force-update';
import LightningTalkService from '../../services/lightning-talk.service';
import AuthService from '../../services/auth.service';
import Paginator from '../paginator/paginator.component';
import { UserContext } from '../../contexts/user';


function LightningTalkListItem({ lightningTalk, toggleVote }) {
  return (
    <div className="col-12 mx-0 px-0 border-bottom">
      <div className="row no-gutters py-4">
        <div className="col-auto pl-2">
          <Link to={`/lightning-talks/${lightningTalk.id}`}>
            { lightningTalk.cover
              ? (<img style={{width: '150px'}} src={`http://${lightningTalk.store}/upload/${lightningTalk.cover}`} className="img-fluid" alt=""/>)
              : (<img style={{width: '150px'}} src="https://via.placeholder.com/150x113.png?text=PPT+is+Still+Processing" className="img-fluid" alt=""/>)}
          </Link>
        </div>
        <div className="col ml-2">
          <div className="px-2">
            <h5>{lightningTalk.title}</h5>
            <div><b>creator:</b> {lightningTalk.owner.username}</div>
            <div>{lightningTalk.votes} votes</div>
            { // Non-login user:
              //   1. Show 'vote' for non-login viewer.
              // Login user:
              //   2. Hide the button for user's own talk
              //   3. Show 'vote' for not-voted item
              //   4. Show 'unvote' for voted item
              lightningTalk.owner.username !== AuthService.getCurrentUser()?.username
              && <button
                  className={'badge badge-sm ' + (lightningTalk.voted ? 'badge-primary' : 'badge-outline')}
                  onClick={toggleVote}>{lightningTalk.voted ? 'unvote':'vote'}</button>
            }
          </div>
        </div>
      </div>
    </div>);
}

function LightningTalkList({ location }) {
  // Need the query page index
  const q = queryString.parse(location.search);

  const [pageIndex, setPageIndex] = useState(parseInt(q.page));
  const [lightningTalks, setLightningTalks] = useState(null);
  const [updateCounter, forceUpdate] = useForceUpdate();
  const [currentUser] = useContext(UserContext);

  useEffect(() => {
    LightningTalkService.list(pageIndex).then(res => {
      setLightningTalks(res.data.result);
    });
  }, [pageIndex, currentUser, updateCounter]);

  const toggleVote = async (item) => {
    if (item.voted) {
      await LightningTalkService.unvote(item.id);
    } else {
      await LightningTalkService.vote(item.id);
    }
    // force UI update to show the new votes
    forceUpdate();
  };

  return (
    <div>
      <h1 className="my-4 pt-4">Lightning Talks</h1>
      { lightningTalks
        && (
          lightningTalks.data.length === 0
          ? <p>No lightning talks at the moment. To be the first sharer, <a className="btn btn-outline-primary btn-sm" href="/create">Create</a> one now!</p>
          : <div>
              <p>Share you mind, <a className="btn btn-outline-primary btn-sm" href="/create">Create</a> your own one!</p>
              { lightningTalks.data.map((item, key) =>
                  <LightningTalkListItem key={key} lightningTalk={item} toggleVote={() => toggleVote(item)}/>)
              }
              <Paginator {...lightningTalks} setPageIndex={setPageIndex}/>
            </div>
          )
      }
    </div>
  );
}

export default LightningTalkList;
