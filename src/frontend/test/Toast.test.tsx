import 'jsdom-global/register'
import * as React from 'react'
import { shallow } from 'enzyme'
import Toast from '../app/components/Toast'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore()
const store = mockStore({})

describe('Toast Component', () => {
  it('Toast should render without throwing an error', () => {
    expect(
      shallow(
        <Provider store={store}>
          <Toast />
        </Provider>
      )
    ).toMatchSnapshot()
  })
})
