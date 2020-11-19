import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import './lightning-talk-detail.component.css';
import { useForceUpdate } from '../../utils/force-update';
import LightningTalkService from '../../services/lightning-talk.service';
import { UserContext } from '../../contexts/user';

// Use web components with React properties and functions
import reactifyWc from 'reactify-wc';
const XSlideshow = reactifyWc('x-slideshow');


function LightningTalkDetail() {
  // Need the query page index
  const params = useParams();

  const [lightningTalk, setLightningTalk] = useState(null);
  const [updateCounter, forceUpdate] = useForceUpdate();
  const [currentUser] = useContext(UserContext);

  useEffect(() => {
    LightningTalkService.get(params.id).then(res => {
      setLightningTalk(res.data.result);
    });
  }, [updateCounter, params.id, currentUser]);

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
    lightningTalk &&
      <div className="row">
        <div className="col-12 col-lg-9">
          <div className="row pt-2">
            <div className="col-12">
              { // XSlideshow is a web component to show PPT images,
                // Display a place holder if no images.
                lightningTalk.images && lightningTalk.images.length > 0
                ? <XSlideshow
                    style={{width: '100%'}}
                    images={ lightningTalk.images.map(i => `http://${lightningTalk.store}/upload/${i}`) } />
                : <img
                    style={{width: '100%'}}
                    src="https://via.placeholder.com/800x600.png?text=PPT+is+Still+Processing" className="img-fluid" alt="" />
              }
            </div>
          </div>
          <div className="row pt-4">
            <div className="col-12">
              <div className="px-2">
                <h3>{lightningTalk.title}</h3>
                <div className="row">
                  <div className="col-6">
                    <b>Creator:</b> {lightningTalk.owner.username}
                  </div>
                  <div className="col-6 text-right">
                    { // Non-login user:
                      //   1. Show 'vote' for non-login viewer.
                      // Login user:
                      //   2. Hide the button for user's own talk
                      //   3. Show 'vote' for not-voted item
                      //   4. Show 'unvote' for voted item
                      lightningTalk.owner.username !== currentUser?.username
                      &&  <button
                            className={'btn btn-sm ' + (lightningTalk.voted ? 'btn-primary':'btn-outline-primary')}
                            onClick={() => toggleVote(lightningTalk)}
                            >{lightningTalk.voted ? 'unvote':'vote'}</button>
                    }
                    <span className="pl-2">{lightningTalk.votes} votes</span>
                  </div>
                </div>
                <hr />
                <p>{lightningTalk.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-3 bg-light">
          <div className="row py-2">
            <div className="col">
              <img width="100%" src="//via.placeholder.com/150x100" alt="" />
            </div>
          </div>
          <div className="row py-2">
            <div className="col">
              <img width="100%" src="//via.placeholder.com/150x100" alt="" />
            </div>
          </div>
          <div className="row py-2">
            <div className="col">
              <img width="100%" src="//via.placeholder.com/150x100" alt="" />
            </div>
          </div>
          <div className="row py-2">
            <div className="col">
              <img width="100%" src="//via.placeholder.com/150x100" alt="" />
            </div>
          </div>
          <div className="row py-2">
            <div className="col">
              <img width="100%" src="//via.placeholder.com/150x100" alt="" />
            </div>
          </div>
        </div>
      </div>
  );
}

export default LightningTalkDetail;
