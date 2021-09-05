import React, { useEffect } from 'react';
import TalkList from '../components/talk-list/TalkList';
import { useAuth } from '../contexts/AuthContext';
import { useTalks } from '../contexts/TalksContext';
import { getTalks } from '../services/talks';
import "./talkPage.css";

function App() {
  const { talks, reloadTalks } = useTalks();
  const { isAuthenticated } = useAuth();
  const callToText = isAuthenticated ? "Create your first talk! :)" : "Please, Log and create a new talk! :)";

  useEffect(() => {
    (async () => {
      const talksFromServer = await getTalks();
      reloadTalks(talksFromServer);
    })();
  }, []);

  return (
    <div className="App">
      {talks.length ?
        <TalkList talks={talks} /> :
        <h1 className="call-to-message">{callToText}</h1>
      }
    </div>
  );
}

export default App;
