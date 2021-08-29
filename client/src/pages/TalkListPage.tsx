import React from 'react'
import './talk.css'
import TalkList from '../components/talk-list/TalkList'
import { TalkCardInfo } from '../types/talk'

function App() {

  const talks: TalkCardInfo[] = [
    {
      title: 'This is a talk',
      description: 'This is the description of the beauty you are This is the description of the beauty you are This is the description of the beauty you are',
      author: 'Frankly Kissman',
      votes: ["test@gmail.com"]
    },
    {
      title: 'Do Dogs Like to walk with People?',
      description: 'This is the description of the beauty you are, This is the description of the beauty you are, This is the description of the beauty you are, This is the description of the beauty you are',
      author: 'Frankly Kissman',
      votes: ["test@gmail.com"]
    },
    {
      title: 'You know who is my mom?',
      description: 'This is the description of the beauty you are, This is the description of the beauty you are, This is the description of the beauty you are, This is the description of the beauty you are,This is the description of the beauty you are',
      author: 'Frankly Kissman',
      votes: ["test@gmail.com", "test@gmail.com", "test@gmail.com", "test@gmail.com"]
    },
    {
      title: 'This is a talk',
      description: 'This is the description of the beauty you are This is the description of the beauty you are This is the description of the beauty you are',
      author: 'Frankly Kissman',
      votes: ["test@gmail.com"]
    },
    {
      title: 'Anitta is like adam levine from brazil',
      description: 'This is the description of the beauty you are, This is the description of the beauty you are, This is the description of the beauty you are, This is the description of the beauty you are',
      author: 'Frankly Kissman',
      votes: ["test@gmail.com"]
    },
    {
      title: 'This is a talk',
      description: 'This is the description of the beauty you are, This is the description of the beauty you are, This is the description of the beauty you are, This is the description of the beauty you are,This is the description of the beauty you are',
      author: 'Frankly Kissman',
      votes: ["test@gmail.com", "test@gmail.com", "test@gmail.com", "test@gmail.com"]
    },
    {
      title: 'Cookie monster monster cookie',
      description: 'This is the description of the beauty you are This is the description of the beauty you are This is the description of the beauty you are',
      author: 'Frankly Kissman',
      votes: ["test@gmail.com"]
    },
    {
      title: 'This is a talk',
      description: 'This is the description of the beauty you are, This is the description of the beauty you are, This is the description of the beauty you are, This is the description of the beauty you are',
      author: 'Frankly Kissman',
      votes: ["test@gmail.com"]
    },
    {
      title: 'This is a talk',
      description: 'This is the description of the beauty you are, This is the description of the beauty you are, This is the description of the beauty you are, This is the description of the beauty you are,This is the description of the beauty you are',
      author: 'Frankly Kissman',
      votes: ["test@gmail.com", "test@gmail.com", "test@gmail.com", "test@gmail.com"]
    },
  ]

  return (
    <div className="App">
      <TalkList talks={talks} />
    </div>
  )
}

export default App
