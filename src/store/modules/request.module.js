import axios from '../../axios/request'
import store from '../index'

export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    }
  },
  mutations: {
    setRequests(state, requests) {
      state.requests = requests
    },
    addRequest(state, requests) {
      state.requests.push(requests)
    },
  },
  actions: {
    async create({ commit, dispatch }, payload) {
      try {
        const token = store.getters['auth/token']
        const { data } = await axios.post(
          `/requests.json?auth=${token}`,
          payload
        )
        commit('addRequest', { ...payload, id: data.name })
        dispatch(
          'setMessage',
          {
            value: 'Заявка успешно создана',
            type: 'primary',
          },
          { root: true }
        )
      } catch (e) {
        dispatch(
          'setMessage',
          {
            value: e.message,
            type: 'danger',
          },
          { root: true }
        )
      }
    },
    async load({ commit, dispatch }) {
      try {
        const token = store.getters['auth/token']
        const { data } = await axios.get(`/requests.json?auth=${token}`)
        console.log(data)
        console.log({ ...data[0] })
        const requests = Object.keys(data).map((id, c, j) => ({
          ...data[id],
          id: id,
        }))
        commit('setRequests', requests)
      } catch (e) {
        dispatch(
          'setMessage',
          {
            value: e.message,
            type: 'danger',
          },
          { root: true }
        )
      }
    },

    async loadById({ dispatch }, id) {
      try {
        const token = store.getters['auth/token']
        const { data } = await axios.get(`/requests/${id}.json?auth=${token}`)

        return data
      } catch (e) {
        dispatch(
          'setMessage',
          {
            value: e.message,
            type: 'danger',
          },
          { root: true }
        )
      }
    },
    async removeById({ dispatch }, id) {
      try {
        const token = store.getters['auth/token']
        await axios.delete(`/requests/${id}.json?auth=${token}`)
        dispatch(
          'setMessage',
          {
            value: 'Заявка успешно удалена',
            type: 'primary',
          },
          { root: true }
        )
      } catch (e) {
        dispatch(
          'setMessage',
          {
            value: e.message,
            type: 'danger',
          },
          { root: true }
        )
      }
    },
    async update({ dispatch }, request) {
      try {
        //debugger
        const token = store.getters['auth/token']
        console.log(request)
        await axios.put(
          `/requests/${request[1]}.json?auth=${token}`,
          request[0]
        )
        dispatch(
          'setMessage',
          {
            value: 'Заявка успешно обновлена',
            type: 'primary',
          },
          { root: true }
        )
      } catch (e) {
        dispatch(
          'setMessage',
          {
            value: e.message,
            type: 'danger',
          },
          { root: true }
        )
      }
    },
  },
  getters: {
    requests(state) {
      return state.requests
    },
  },
}
