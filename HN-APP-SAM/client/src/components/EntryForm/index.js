import React from 'react'
import { debounce } from 'lodash'

export default (props) => {
  const { type, onChange, onSubmit, history } = props
  const headerMap = {
    login: 'Please Log In',
    signup: 'Please Sign up',
  }
  const submitText = type === 'login' ? 'Log in' : 'Sign up' 
  return (
    <div className="login-wrapper">
      <h1>{headerMap[type]}</h1>
      <form>
        <label>
          <p>Username</p>
          <input
            type="text"
            name="name"
            onChange={debounce((e) => {
              onChange(['name', e.target.value])
            }, 300)}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            name="password"
            onChange={debounce((e) => {
              onChange(['password', e.target.value])
            }, 300)}
          />
        </label>
        {type === 'signup' ? (
          <label>
            <p>Confirm Password</p>
            <input
              type="password"
              name="password2"
              onChange={debounce((e) => {
                onChange(['password2', e.target.value])
              }, 300)}
            />
          </label>
        ) : null}
      </form>
      <br />
      <div className="form-action">
        <button onClick={onSubmit}>{submitText}</button>
        {type === 'login' ? (
          <button onClick={() => history.push('/signup')}>Sign up</button>
        ) : null}
      </div>
    </div>
  )
}
