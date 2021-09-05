import React, { useEffect } from 'react'
import './talk.css'
import TalkList from '../components/talk-list/TalkList'
import { TalkCardInfo } from '../types/talk'
import { useTalks } from '../contexts/TalksContext'
import { getTalks } from '../services/talks'

function App() {
  const { talks, reloadTalks } = useTalks()

  useEffect(() => {
    (async () => {
      const talksFromServer = await getTalks();
      reloadTalks(talksFromServer)
    })();
  }, []);

  return (
    <div className="App">
      {talks.length ?
        <TalkList talks={talks} /> :
        <p>Please Login and create a new talk</p>
      }
    </div>
  )
}

export default App
