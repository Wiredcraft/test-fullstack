import React, { useState } from 'react'
import { Input, Button } from '@/components/form'
import { register, login, saveToken, redirectWithToken } from '@/services/user'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import './index.css'

export default function() {

  const [activeTab, setActiveTab] = useState('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const location = useLocation()
  const params = queryString.parse(location.search)
  const { addToast } = useToasts()

  const toggleActive = (tab: string) => {
    setActiveTab(tab)
  }

  const submitHandle = async () => {
    if (!username) {
      addToast('Please input username', {
        appearance: 'warning'
      })
      return 
    }
    if (!password) {
      addToast('Please input password', {
        appearance: 'warning'
      })
      return
    }
    const func = activeTab === 'login' ? login : register
    const toastText = activeTab === 'login' ? 'Login successed' : 'Register successed'
    try {
      const { token } = await func({ username, password })
      addToast(toastText, {
        appearance: 'warning'
      })
      saveToken(token)
      redirectWithToken(token, params)
    } catch (err: any) {
      addToast(err.message, {
        appearance: 'error'
      })
    }
  }

  return (
    <div className='login-wrapper'>
      <div className='login-box'>
        <div className="tab-wrapper">
          <div onClick={() => toggleActive('login')} className={activeTab === 'login' ? 'active' : ''}>Login</div>
          <div onClick={() => toggleActive('register')} className={activeTab === 'register' ? 'active' : ''}>Create Account</div>
        </div>
        <div className='login-form'>
          <form>
            <Input label='Username' onChange={setUsername} />
            <Input type='password' label='Password' onChange={setPassword} />
            <Button btnText={activeTab === 'login' ? 'Login' : 'Create Account'} onClick={submitHandle} />
          </form>
        </div>
      </div>
    </div>
  )
}