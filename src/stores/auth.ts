import { error, ERROR_CODES } from '../utils/error'
import { defineStore } from 'pinia'
import { useRootStore } from './root'
import { useFirebaseAuth } from 'vuefire'
import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { FormField } from '../use/login-form'

export const useAuthStore = defineStore('auth', {
  actions: {
    async logout() {
      const auth = useFirebaseAuth()

      try {
        if (auth) await signOut(auth)
      } catch (e) {
        /* empty */
      }
    },
    async login({ email, password }: FormField) {
      const root = useRootStore()
      const auth = useFirebaseAuth()

      try {
        if (auth) await signInWithEmailAndPassword(auth, email, password)
        root.clearMessage()
      } catch (e) {
        if (e instanceof FirebaseError)
          root.setMessage({
            value: error(e.code as keyof typeof ERROR_CODES),
            type: 'danger',
          })
        throw new Error()
      }
    },
  },
})
