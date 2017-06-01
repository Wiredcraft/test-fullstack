import { combineReducers } from 'redux'
import route from 'route'
import posts from 'posts'
import signin from 'signin'
import user from 'user'
import modal from 'modal'
import toast from 'toast'

export default combineReducers({
  route,
  posts,
  signin,
  user,
  modal,
  toast,
})
