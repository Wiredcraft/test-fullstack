import React from 'react'
import {shallow} from 'enzyme'
import TalkList from './TalkList'

const defaultTalks = [{
  author: 'jzf',
  title: 'test',
  description: 'hello world',
  id: 12345,
  created: 1515566058608,
  votes: 13487618,
  voted: false,
}]

const setup = (talks = defaultTalks) => {
  return shallow(
    <TalkList
      talks={talks}
      onVoteForTalk={jest.fn()}
    />
  )
}

describe('<TalkList />', () => {
  it('renders without crashing', () => {
    setup()
  })

  it('renders placeholder text when talk list is empty', () => {
    const talkList = setup([])
    expect(talkList.text()).toEqual('Feel free to submit your talk.')
  })  
})
