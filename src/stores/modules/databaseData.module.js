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
    async report({ state }, { type: reportType, date, offsetInHours }) {
      const typeMap = { week: 'DAYOFMONTH', month: 'DAYOFMONTH', date: 'hour' }
      const query = `
      query{
        report(
          reportType:"${reportType}", date:"${date}", offsetInHours:"${offsetInHours}"
        ) {
          average ${typeMap[reportType]} parameter
        }
      }  
      `
      try {
        const { data } = await instance
          .post('/', JSON.stringify({ query: query }))
          .catch(function (error) {
            // handle error
            console.log('Ошибка загрузки:', error)
          })
        //console.log('полученно', data.data.report)
        state.dataBaseData = data.data.report
        //state.dataBaseData = data.data.report.sort(
        //  (a, b) => +a.timestamp - +b.timestamp
        //)
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
