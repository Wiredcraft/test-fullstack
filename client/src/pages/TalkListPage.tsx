import React from 'react'
import './talk.css'
import TalkList from '../components/talk-list/TalkList'

function App() {
//create interface file
type Talk = {
	title: string;
	description: string;
	votes: string[];
	author: string;
}

  const talks: Talk[] = [
    {
      title: 'Test',
      description: 'Test',
      author: 'Test',
      votes: ["test@gmail.com"]
    },
    {
      title: 'Test2',
      description: 'Test2',
      author: 'Test',
      votes: ["test@gmail.com"]
    },
    {
      title: 'Test3',
      description: 'Test3',
      author: 'Test',
      votes: ["test@gmail.com"]
    }
  ]

  return (
    <div className="App">
      <TalkList  talks={talks} />
    </div>
  )
}

export default App
