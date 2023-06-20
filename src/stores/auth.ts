import axios, { AxiosError } from 'axios'
import { error } from '../utils/error'
import { defineStore } from 'pinia'
import { useRootStore } from './root'

const TOKEN_KEY = 'jwt-token'

interface State {
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    token: localStorage.getItem(TOKEN_KEY),
  }),
  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    logout() {
      this.token = null
      localStorage.removeItem(TOKEN_KEY)
    },
    async login(payload: never) {
      const root = useRootStore()

      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`

        const { data } = await axios.post(url, {
          // @ts-ignore
          ...payload,
          returnSecureToken: true,
        })

        this.setToken(data.idToken)
        root.clearMessage()
      } catch (e) {
        if (e instanceof AxiosError)
          root.setMessage({
            value: error(e.response?.data.error.message),
            type: 'danger',
          })
        throw new Error()
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
})
