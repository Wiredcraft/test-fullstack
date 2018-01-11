import React from 'react'
import {mount} from 'enzyme'
import TalkBox from './TalkBox'

const setup = () => {
  return mount(
    <TalkBox
      talkBox={{
        author: {
          value: '',
          violation: '',
        },
        title: {
          value: '',
          violation: '',
        },
        description: {
          value: '',
          violation: '',
        },
        isPublic: {
          value: '',
          violation: '',
        }
      }}
      onChangeField={jest.fn()}
      onSubmitBox={jest.fn()}
    />
  )
}

describe('<TalkBox />', () => {
  it('renders without crashing', () => {
    setup()
  })
})
