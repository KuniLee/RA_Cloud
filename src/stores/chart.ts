import { defineStore } from 'pinia'

export const useChartStore = defineStore('chart', {
  state() {
    return {
      colorMap: { temp: 'red', humid: 'blue' },
      labelMap: { temp: 'Температура', humid: 'Влажность' },
    }
  },
})
