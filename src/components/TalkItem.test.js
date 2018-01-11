import React from 'react'
import {mount} from 'enzyme'
import TalkItem from './TalkItem'

const setup = (overrides = {}) => {
  const talk = {
    author: 'jzf',
    title: 'test',
    description: 'hello world',
    id: 12345,
    created: 1515566058608,
    votes: 13487618,
    voted: false,
    ...overrides,
  }

  return mount(
    <TalkItem
      talk={talk}
      onVote={jest.fn()}
    />
  )
}

describe('<TalkItem />', () => {
  it('renders without crashing', () => {
    setup()
  })

  it('renders vote button when current has not voted', () => {
    const talkItem = setup({voted: false})
    expect(talkItem.find('.TalkItem-vote').exists()).toBe(true)
  })

  it('hides vote button when current has voted', () => {
    const talkItem = setup({voted: true})
    expect(talkItem.find('.TalkItem-vote').exists()).toBe(false)
  })

  it('renders created time relatively', () => {
    const talkItem = setup({publishDate: Date.now()})
    expect(talkItem.find('.TalkItem-created').text()).toEqual('publish a few seconds ago')
  })
})
