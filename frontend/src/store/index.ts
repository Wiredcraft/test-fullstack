import create from 'zustand'
import { persist } from 'zustand/middleware'
import Cookies from 'universal-cookie'
import { loadToken } from '@/services/user'

export interface User {
  username: string
}

const cookies = new Cookies()

const cookieStorage = {
  getItem: (name: string) => {
    return cookies.get(name)
  },
  setItem: (name: string, value: string) => {
    cookies.set(name, value, { path: '/'})
  }
}

export const useStore = create(persist(set => ({
  user: {
    username: undefined,
  },
  setUser: (user: User) => set({ user }),
  token: loadToken(),
  setToken: (token?: string) => set({ token }),
  loading: false,
  setLoading: (loading: boolean) => set({ loading })
}), {
  name: 'auth',
  getStorage: () => cookieStorage,
}))
