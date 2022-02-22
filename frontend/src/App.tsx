import { lazy, Suspense, useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Loading from '@/components/loading'
import { useStore } from './store'
import { fetchUser } from './services/user'
import queryString from 'query-string'
import { ToastProvider } from 'react-toast-notifications'

const Dashboard = lazy(() => import('@/pages/dashboard'))
const Submit = lazy(() => import('@/pages/submit'))
const Login = lazy(() => import('@/pages/login'))

function App() {

  const { setUser, setToken, token } = useStore()

  useEffect(() => {
    const params = queryString.parse(window.location.search)
    if (params.token) {
      setToken(params.token as string)
    }
  }, [])

  useEffect(() => {
    if (token) {
      fetchUser().then(setUser)
    }
  }, [token])

  return (
    <ToastProvider
      autoDismiss
      autoDismissTimeout={2000}
      placement="top-center"
    >
      <BrowserRouter>
        <Suspense
          fallback={(
            <Loading />
          )}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path='/submit' element={<Submit />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App
