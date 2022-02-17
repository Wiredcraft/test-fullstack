import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { lightingTalkStore, uiStore } from '../../stores';
import imgTitle from '../../assets/images/hack-news.png';
import { LightingTalk, VoteLightingTalkRequest } from '../../models';
import LightingTalkListItem from '../LightingTalkListItem';
import LightingTalkEditor from '../LightingTalkEditor';
import './index.scss';

type Props = {};

const LightingTalkList: React.FC<Props> = observer((props) => {
  // Toggle editor show/hidden
  const [hasLogined, _] = useState(uiStore?.hasLogined);
  const [showEditor, setShowEditor] = useState(false);

  // Add new topic
  const onAddTopic = () => {
    setShowEditor(true);
  };

  // On talk selected
  const onSelectItem = (item: LightingTalk) => {
    item.showContent = !item.showContent;
    lightingTalkStore.setLightingTalk([...lightingTalkStore.lightingTalk]);
  };

  // On Vote
  const onVote = async (item: LightingTalk) => {
    const request = {
      id: item.id,
    } as VoteLightingTalkRequest;
    lightingTalkStore
      .voteLightingTalk(request)
      .then(() => {
        lightingTalkStore.fetchLightingTalk();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Successed to add news
  const onAddNewsSuccess = () => {
    setShowEditor(false);
  };

  // Successed to add news
  const onCancel = () => {
    setShowEditor(false);
  };

  // Fetch news data
  useEffect(() => {
    lightingTalkStore.fetchLightingTalk();
  }, []);

  return (
    <section className="lighting-talk-list">
      <div className="lighting-talk-list__title">
        <img src={imgTitle} />
      </div>
      {lightingTalkStore.lightingTalk?.length > 0 ? (
        lightingTalkStore.lightingTalk.map((item, index) => {
          return <LightingTalkListItem key={item.id} index={index} item={item} onShowDetail={onSelectItem} onVote={onVote} />;
        })
      ) : (
        <h1>Hi, you! Try to say something</h1>
      )}

      {showEditor ? <LightingTalkEditor onSuccess={onAddNewsSuccess} onCancel={onCancel} /> : <button onClick={onAddTopic}>Add topic</button>}
    </section>
  );
});

export default LightingTalkList;
