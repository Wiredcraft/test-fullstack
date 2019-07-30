export const GET_POSTS = 'GET_POSTS'
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
export const GET_POSTS_FAIL = 'GET_POSTS_FAIL'

export const CREATE_POST = 'CREATE_POST'
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'
export const CREATE_POST_FAIL = 'CREATE_POST_FAIL'

export const USER_REG = 'USER_REG'
export const USER_REG_SUCCESS = 'USER_REG_SUCCESS'
export const USER_REG_FAIL = 'USER_REG_FAIL'

export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL'

export const USER_VOTE = 'USER_VOTE'
export const USER_VOTE_SUCCESS = 'USER_VOTE_SUCCESS'
export const USER_VOTE_FAIL = 'USER_VOTE_FAIL'

export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'
export const UPDATE_POSTS = 'UPDATE_POSTS'

const apiDrivesBase = 'http://localhost:3000/api'
const apiDrive = {
  articles: apiDrivesBase + '/articles',
  users: apiDrivesBase + '/users',
  login: apiDrivesBase + '/users/login',
  vote: apiDrivesBase + '/voting'
}

export function getPosts (params?: any) {
  return {
    types: [GET_POSTS, GET_POSTS_SUCCESS, GET_POSTS_FAIL],
    promise: (apiRequest: any) => apiRequest.get(apiDrive.articles, {
      params,
    }),
  }
}

export function createPost (params: any) {
  return {
    types: [CREATE_POST, CREATE_POST_SUCCESS, CREATE_POST_FAIL],
    promise: (apiRequest: any) => apiRequest.post(apiDrive.articles, {
      data: params,
    }),
  }
}

export function userReg (params: any) {
  return {
    types: [USER_REG, USER_REG_SUCCESS, USER_REG_FAIL],
    promise: (apiRequest: any) => apiRequest.post(apiDrive.users, {
      data: params,
    }),
  }
}

export function userLogin (params: any) {
  return {
    types: [USER_LOGIN, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL],
    promise: (apiRequest: any) => apiRequest.post(apiDrive.login, {
      data: params,
    }),
  }
}

export function userVote (params: any) {
  return {
    types: [USER_VOTE, USER_VOTE_SUCCESS, USER_VOTE_FAIL],
    promise: (apiRequest: any) => apiRequest.post(apiDrive.vote, {
      data: params,
    }),
  }
}

export function updateUserInfo (params: any) {
  return {
    type: 'UPDATE_USER_INFO',
    params,
  }
}

export function updatePosts (params: any) {
  return {
    type: 'UPDATE_POSTS',
    params,
  }
}
