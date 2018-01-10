import React from 'react'
import {mount} from 'enzyme'
import TalkBox from './TalkBox'

const setup = () => {
  return mount(
    <TalkBox onAddTalk={jest.fn()} />
  )
}

describe('<TalkBox />', () => {
  it('renders without crashing', () => {
    setup()
  })

  it('clears all the fileds after submiting', () => {
    const talkBox = setup()
    talkBox.setState({title: 'title', author: 'someone'})
    talkBox.find('form').simulate('submit')
    expect(talkBox.state('title')).toEqual('')
    expect(talkBox.state('author')).toEqual('')
  })
})
