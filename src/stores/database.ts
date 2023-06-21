import axios from '../axios/request'
import { defineStore } from 'pinia'
import { useRootStore } from './root'

type Parameter = 'temp' | 'humid'

export type Data = {
  average: number
  parameter: Parameter
}

type State = {
  dataBaseData: Array<Data>
}

enum ReportType {
  'week',
  'month',
  'date',
}

export const useDBStore = defineStore('database', {
  state: (): State => ({
    dataBaseData: [],
  }),
  actions: {
    async report(input: { type: ReportType | null; date: string | null; offsetInHours: string | null }) {
      const { setMessage } = useRootStore()
      const typeMap: Record<keyof typeof ReportType, string> = { week: 'DAYOFMONTH', month: 'DAYOFMONTH', date: 'hour' }

      const query = `
      query{
        report(
          reportType:"${input.type}", date:"${input.date}", offsetInHours:"${input.offsetInHours}"
        ) {
          average ${typeMap[input.type as unknown as keyof typeof ReportType]} parameter
        }
      }  
      `

      try {
        const { data } = (await axios.post('/', JSON.stringify({ query: query })).catch(function (error) {
          console.log('Ошибка загрузки:', error)
        })) as {
          data: { data: { report: Data[] } }
        }

        this.dataBaseData = data.data.report
      } catch (e) {
        if (e instanceof Error)
          setMessage({
            value: e.message,
            type: 'danger',
          })
      }
    },
  },
})
