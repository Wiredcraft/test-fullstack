import { clearToken } from '@/services/user'
import { useStore } from '@/store'
import { useNavigate } from 'react-router-dom'
import './index.css'

export default function() {

  const navigate = useNavigate()
  const { user, token } = useStore()
  const setUser = useStore(state => state.setUser)
  const setToken = useStore(state => state.setToken)

  const gotoLogin = () => {
    navigate('/login')
  }

  const gotoSubmit = () => {
    if (!token) {
      navigate(`/login`)
      return 
    }
    navigate('/submit')
  }

  const gotoNews = () => {
    navigate('/')
  }

  const logoutHandle = () => {
    setToken(undefined)
    setUser({ username: '' })
    clearToken()
    navigate('/')
  }

  return (
    <header className='header-wrapper'>
      <div className='header-left-wrapper'>
        <div onClick={gotoNews}>Test-Fullstack</div>
        <div onClick={gotoSubmit}>Submit</div>
      </div>
      <div className='header-right-wrapper'>
        {!!user?.username && <div>{user.username}</div>}
        {!token ? <div onClick={gotoLogin}>Login</div> : <div onClick={logoutHandle}>Logout</div>}
      </div>
    </header>
  )
}