import configureStore from './configureStore'
import ApiRequest from './utils/apiRequest'

const apiRequest = new ApiRequest()

export const store = configureStore({
  platformMiddleware: [],
  apiRequest,
})
