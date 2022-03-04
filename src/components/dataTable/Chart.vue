<template>
  <h3 class="text-black"></h3>

  <LineChart
    ref="LineChartRef"
    :chartData="testData"
    :options="options"
  ></LineChart>
  <button class="btn" @click="reset">
    Сброс
  </button>
</template>

<script>
import { dataForChart } from '../../utils/dataForChart'
import zoomPlugin from 'chartjs-plugin-zoom'
import { Chart, registerables } from 'chart.js'
import { LineChart } from 'vue-chart-3'
import { ref, computed } from 'vue'
import 'chartjs-adapter-date-fns'
import { useStore } from 'vuex'
Chart.register(...registerables, zoomPlugin)
Chart.defaults.datasets.line.showLine = true

export default {
  props: ['chartData'],
  setup(props) {
    const store = useStore()
    const LineChartRef = ref()
    const options = {
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
            displayFormats: {
              minute: 'kk:mm',
              hour: 'kk:mm',
              second: 'mm:ss',
            },
          },
        },
      },
      responsive: true,
      plugins: {
        zoom: {
          limits: {
            x: { min: 0, max: Date.now(), minRange: 50 },
            // y: { min: 0, max: 100, minRange: 20 },
          },
          pan: {
            enabled: false,
            mode: 'x',
            //threshold: 10,
          },
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: 'x',
            drag: {
              enabled: true,
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
    function reset() {
      LineChartRef.value.chartInstance.resetZoom()
    }
    const testData = computed(() => {
      const obj = dataForChart(props.chartData)
      const entries = Object.entries(obj)
      const dataset = new Array()
      entries.forEach(([key, value]) => {
        dataset.push({
          showLine: true,
          spanGaps: false,
          pointRadius: 0,
          data: value,
          hidden: false,
          label: store.state.chart.labelMap[key],
          backgroundColor: 'black',
          borderColor: store.state.chart.colorMap[key],
          //borderWidth: 8,
          color: store.state.chart.colorMap[key],
          //pointStyle: 'triangle',
          rotation: 90,
          tension: 0.2,
        })
      })
      // const { LineChartProps, LineChartRef } = useLineChart({
      //   testData,
      //   options,
      // })
      return {
        datasets: dataset,
      }
    })

    return { testData, options, LineChartRef, reset }
  },
  components: { LineChart },
}
</script>

<style></style>
