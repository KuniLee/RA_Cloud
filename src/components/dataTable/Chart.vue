<template>
  <h3 class="text-black"></h3>
  <LineChart ref="LineChartRef" :chart-data="testData" :options="options"></LineChart>
</template>

<script lang="ts">
// @ts-nocheck
import { dataForChart } from '../../utils/dataForChart'
import zoomPlugin from 'chartjs-plugin-zoom'
import { Chart, registerables } from 'chart.js'
import 'chartjs-adapter-date-fns'
import { LineChart } from 'vue-chart-3'
import { ref, computed } from 'vue'
import { useChartStore } from '../../stores/chart'
Chart.register(...registerables, zoomPlugin)
Chart.defaults.datasets.line.showLine = true

export default {
  components: { LineChart },
  props: ['chartData'],
  setup(props) {
    const store = useChartStore()
    const LineChartRef = ref()

    const options = computed(() => {
      const opt = {
        fill: false, //  закрашивает площадь снизу
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          x: {
            parsing: false,
            type: 'time',
            time: {
              unit: 'day',
              tooltipFormat: 'dd LLLL: H', // формат вывода даты в окошечко
              minUnit: 'hour',
              displayFormats: {
                day: 'dd LLL',
                hour: 'H',
              },
            },
          },
        },
        responsive: true,
        plugins: {
          zoom: {
            pan: {
              enabled: false,
              mode: 'x',
            },
            zoom: {
              wheel: {
                enabled: false,
              },
              pinch: {
                enabled: false,
              },
              mode: 'x',
              drag: {
                enabled: false,
              },
            },
          },
          legend: {
            labels: {
              font: {
                size: 14,
              },
            },
            position: 'left',
          },

          title: {
            display: false,
            text: 'Название графика',
          },
        },
      }

      if (props.chartData.length !== 0) {
        // eslint-disable-next-line no-prototype-builtins
        if (props.chartData[0].hasOwnProperty('hour')) {
          opt.scales.x.time.unit = 'hour'
          opt.scales.x.time.tooltipFormat = 'час:H - dd LLLL R'
        }

        // eslint-disable-next-line no-prototype-builtins
        if (props.chartData[0].hasOwnProperty('DAYOFMONTH')) {
          opt.scales.x.time.unit = 'day'
          opt.scales.x.time.tooltipFormat = 'dd LLLL R'
        }
      }

      return opt
    })

    function reset() {
      LineChartRef.value.chartInstance.resetZoom()
    }

    const testData = computed(() => {
      const obj = dataForChart(props.chartData)
      const entries = Object.entries(obj)
      const dataset = []

      entries.forEach(([key, value]) => {
        dataset.push({
          showLine: true,
          spanGaps: false,
          pointRadius: 5,
          data: value,
          hidden: false,
          label: store.labelMap[key],
          backgroundColor: 'black',
          borderColor: store.colorMap[key],
          color: store.colorMap[key],
          pointStyle: 'circle',
          rotation: 90,
          tension: 0.2,
        })
      })

      return {
        datasets: dataset,
      }
    })

    return { testData, options, LineChartRef, reset }
  },
}
</script>

<style></style>
