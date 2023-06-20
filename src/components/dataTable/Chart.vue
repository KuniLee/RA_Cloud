<template>
  <h3 class="text-black"></h3>

  <LineChart ref="LineChartRef" :chart-data="testData" :options="options"></LineChart>
  <!-- кнопка сброса масштаба -->
  <!-- <button class="btn" @click="reset">Сброс</button> -->
</template>

<script>
import { dataForChart } from '../../utils/dataForChart'
import zoomPlugin from 'chartjs-plugin-zoom'
import { Chart, registerables } from 'chart.js'
import { LineChart } from 'vue-chart-3'
import { ref, reactive, computed, watch } from 'vue'
import 'chartjs-adapter-date-fns'
import { useStore } from 'vuex'
//import 'chartjs-adapter-date-fns'
Chart.register(...registerables, zoomPlugin)
Chart.defaults.datasets.line.showLine = true

export default {
  components: { LineChart },
  props: ['chartData'],
  setup(props) {
    const store = useStore()
    const LineChartRef = ref()

    const options = computed(() => {
      const opt = {
        fill: false, //  закрашивает площадь снизу
        interaction: {
          mode: 'index',
          intersect: false,
        },

        //showLine: true, // disable for all datasets,
        layout: {
          //padding: { right: 80 },
        },
        datasets: {
          line: {
            //pointRadius: 0.1, // disable for all `'line'` datasets
          },
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
            // limits: {
            //   x: { min: 0, max: Date.now(), minRange: 50 },
            //   // y: { min: 0, max: 100, minRange: 20 },
            // },
            pan: {
              enabled: false,
              mode: 'x',
              //threshold: 10,
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
        if (props.chartData[0].hasOwnProperty('hour')) {
          opt.scales.x.time.unit = 'hour'
          opt.scales.x.time.tooltipFormat = 'час:H - dd LLLL R'
        }

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
          label: store.state.chart.labelMap[key],
          backgroundColor: 'black',
          borderColor: store.state.chart.colorMap[key],
          //borderWidth: 8,
          color: store.state.chart.colorMap[key],
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
