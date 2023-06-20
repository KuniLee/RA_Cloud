import { defineStore } from 'pinia'

interface State {
  message: Message | null
  sidebar: boolean
}

type Message = {
  value: string
  type: 'danger' | 'warning'
}

export const useRootStore = defineStore('root', {
  state: (): State => ({
    message: null,
    sidebar: false,
  }),
  actions: {
    clearMessage() {
      this.message = null
    },
    openSidebar() {
      this.sidebar = true
    },
    closeSidebar() {
      this.sidebar = false
    },
    setMessage(message: Message) {
      this.message = message
      setTimeout(() => {
        this.clearMessage()
      }, 5000)
    },
  },
})
