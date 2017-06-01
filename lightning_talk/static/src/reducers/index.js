import { combineReducers } from 'redux'
import posts from 'posts'
import signin from 'signin'
import user from 'user'
import toast from 'toast'

export default combineReducers({
  posts,
  signin,
  user,
  toast
})
