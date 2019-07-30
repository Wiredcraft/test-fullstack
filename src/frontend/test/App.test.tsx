import 'jsdom-global/register'
import * as React from 'react'
import { shallow } from 'enzyme'
import { App } from '../app/App'

describe('App Component', () => {
  it('App should render without throwing an error', () => {
    expect(
      shallow(
        <App />
      )
    ).toMatchSnapshot()
  })
})
