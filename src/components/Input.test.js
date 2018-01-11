import React from 'react'
import {mount} from 'enzyme'
import Input from './Input'

const setup = (overrides) => {
  return mount(
    <Input {...overrides} />
  )
}

describe('<Input />', () => {
  it('renders without crashing', () => {
    setup()
  })

  it('renders <input /> by default', () => {
    const input = setup()
    expect(input.find('input').exists()).toBe(true)
  })

  it('could also render <textarea />', () => {
    const input = setup({tag: 'textarea'})
    expect(input.find('textarea').exists()).toBe(true)
  })

  it('renders violation if passed', () => {
    const input = setup({violation: 'violation'})
    expect(input.find('.Input-violation').text()).toEqual('violation')
  })

  it('handles className correctly', () => {
    const input = setup({className: 'test'})
    expect(input.find('.Input-wrapper.test').exists()).toBe(true)
  })
})
