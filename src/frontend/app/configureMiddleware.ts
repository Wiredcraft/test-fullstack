// import { handleUserCookies } from './utils/utils';
// var _ = require('./utils/underscore')

const apirequestMiddleware = (apiRequest: void) => ({dispatch, getState}: {dispatch: any, getState: any}) => {
  return (next: any) => (action: any) => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    const { promise, types, ...rest } = action // eslint-disable-line no-redeclare
    if (!promise) {
      return next(action)
    }
    const [REQUEST, SUCCESS, FAILURE] = types
    next({...rest, type: REQUEST})

    // const tokenErrCode = 10908320
    const actionPromise = promise(apiRequest)

    actionPromise.then(
      (result: any) => {
        // if (_.has(result, 'code') && result.code === -8) {
        //   resetUserCredential(dispatch)
        // }

        if (result) {
          next({...rest, result, type: SUCCESS})
        } else {
          next({...rest, result, type: FAILURE})
        }
      },
      (error: any) => {
        next({...rest, error, type: FAILURE})
      }
    ).catch((error: any) => {
      next({...rest, error, type: FAILURE})
    })

    return actionPromise
  }
}

export default function configureMiddleware (platformMiddleware: any, apiRequest: any) {
  const middleware = [
    apirequestMiddleware(apiRequest),
    ...platformMiddleware,
  ];

  return middleware;
}
