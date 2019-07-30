import * as actions from '../actions/talksActions'
import { resultHandler } from '../utils/errorHandler'

const errorHandler = resultHandler
const _ = require('../utils/underscore')
const defaultUserState = {
  isLoggedIn: false,
  username: '',
  token: '',
}
const initialState = {
  makeReqing: false,
  getPosts: null,
  createPost: null,
  userInfo: _.clone(defaultUserState)
}

export default function toastReducer (state = initialState, action: any) {
  switch (action.type) {

    case actions.GET_POSTS:
      return {
        ...state,
        makeReqing: true,
      }
    case actions.GET_POSTS_SUCCESS:
      const getPostsResult = errorHandler(action.result)
      return {
        ...state,
        makeReqing: false,
        getPosts: getPostsResult,
      }
    case actions.GET_POSTS_FAIL:
      return {
        ...state,
        makeReqing: false,
      }


    case actions.CREATE_POST:
      return {
        ...state,
        makeReqing: true,
      }
    case actions.CREATE_POST_SUCCESS:
      const createPostResult = errorHandler(action.result)
      return {
        ...state,
        makeReqing: false,
        createPost: createPostResult,
      }
    case actions.CREATE_POST_FAIL:
      return {
        ...state,
        makeReqing: false,
      }


    case actions.USER_REG:
      return {
        ...state,
        makeReqing: true,
      }
    case actions.USER_REG_SUCCESS:
      const userRegResult = errorHandler(action.result)

      if (userRegResult.user) {
        userRegResult.user.isLoggedIn = true
        userRegResult.user.through = 'register'
      }
      return {
        ...state,
        makeReqing: false,
        userInfo: userRegResult.user || _.clone(defaultUserState),
      }
    case actions.USER_REG_FAIL:
      return {
        ...state,
        makeReqing: false,
      }


    case actions.USER_LOGIN:
      return {
        ...state,
        makeReqing: true,
      }
    case actions.USER_LOGIN_SUCCESS:
      const userLoginResult = errorHandler(action.result)

      if (userLoginResult.user) {
        userLoginResult.user.isLoggedIn = true
        userLoginResult.user.through = 'login'
      }

      return {
        ...state,
        makeReqing: false,
        userInfo: userLoginResult.user || _.clone(defaultUserState),
      }
    case actions.USER_LOGIN_FAIL:
      return {
        ...state,
        makeReqing: false,
      }


    case actions.USER_VOTE:
      return {
        ...state,
        makeReqing: true,
      }
    case actions.USER_VOTE_SUCCESS:
      const userVoteResult = errorHandler(action.result)
      return {
        ...state,
        makeReqing: false,
        userVote: userVoteResult,
      }
    case actions.USER_VOTE_FAIL:
      return {
        ...state,
        makeReqing: false,
      }


    case actions.UPDATE_USER_INFO:
      if (action.params.reset) {
        action.params = _.clone(defaultUserState)
      }
      return {
        ...state,
        userInfo: action.params,
      }

    case actions.UPDATE_POSTS:
      return {
        ...state,
        getPosts: action.params,
      }

  }

  return state
}
