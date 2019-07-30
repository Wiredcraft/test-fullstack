import 'jsdom-global/register'
import * as React from 'react'
import { shallow } from 'enzyme'
import HomePage from '../app/pages/HomePage'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore()
const store = mockStore({})

describe('HomePage', () => {
  it('HomePage should render without throwing an error', () => {
    expect(
      shallow(
        <Provider store={store}>
          <HomePage />
        </Provider>
      )
    ).toMatchSnapshot()
  })
})
