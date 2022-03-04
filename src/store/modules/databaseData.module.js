import axios from '../../axios/request'

const instance = axios.create({
  baseURL: `${process.env.VUE_APP_BACK_END_URL}/graphql`,
  timeout: 8000,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
})

export default {
  namespaced: true,
  state() {
    return {
      dataBaseData: [],
    }
  },
  mutations: {
    setData(state, data) {
      state.dataBaseData = data
    },
    // addRequest(state, requests) {
    //   state.requests.push(requests)
    // },
  },
  actions: {
    async downloadByTime({ state }, { startDT, endDT }) {
      //console.log(startDT, endDT)
      const query = `
      query{
        downloadByTime(
         timeStart:"${startDT}", timeEnd:"${endDT}"
        ) {
          timestamp value parameter
        }
      }  
      `
      try {
        const { data } = await instance
          .post('/', JSON.stringify({ query: query }))
          .catch(function(error) {
            // handle error
            console.log('Ошибка загрузки:', error)
          })
        //state.dataBaseData = data.data.getValues
        state.dataBaseData = data.data.downloadByTime.sort(
          (a, b) => +a.timestamp - +b.timestamp
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
    getData(state) {
      return state.dataBaseData
    },
  },
}
