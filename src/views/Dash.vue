<template>
  <app-page title="Реальные значения:">
    <template #header>
      <!-- <button class="btn primary" @click="modal = true">
        Создать
      </button> -->
    </template>
    <div class="container row">
      <div class="card w-50 marked">
        <h3>Температура: {{ temp }}°C</h3>
      </div>
      <div class="card w-50 marked">
        <h3>Влажность: {{ humid }}%</h3>
      </div>
    </div>
    <button class="btn primary" @click="modal = true">Загрузить</button>

    <app-loader v-if="loading"></app-loader>
    <div>
      <chart
        v-if="requests.length !== 0 && !loading"
        :chartData="requests"
      ></chart>

      <h3 class="text-center text-black" v-if="noDataMsg && !loading">
        Нет данных
      </h3>

      <!-- <request-table  :noteData="requests"></request-table> -->
    </div>

    <teleport to="body">
      <app-model v-if="modal" title="Загрузить данные" @close="modal = false">
        <report-input v-model="input"></report-input>
        <!-- <request-filter v-model="filter"></request-filter> -->
        <button class="btn danger" :disabled="!enable" @click="makeRequest">
          Загрузить
        </button>
        <!-- <request-modal @created="modal = false"></request-modal -->
      </app-model>
    </teleport>
  </app-page>
</template>

<script>
import { io } from 'socket.io-client'
import { ref, computed } from 'vue'
import RequestTable from '../components/dataTable/RequestTable.vue'
import AppPage from '../components/ui/AppPage.vue'
import AppModel from '../components/ui/AppModel.vue'
//import RequestFilter from '../components/dataTable/RequestFilter.vue'
import ReportInput from '../components/dataTable/ReportInput.vue'
import RequestModal from '../components/request/RequestModal.vue'
import AppLoader from '../components/ui/AppLoader.vue'
import { useStore } from 'vuex'
import Chart from '../components/dataTable/Chart.vue'

export default {
  name: 'Home',
  components: {
    AppPage,
    RequestTable,
    AppModel,
    RequestModal,
    AppLoader,
    //RequestFilter,
    ReportInput,
    Chart,
  },
  setup() {
    const socket = io(process.env.VUE_APP_BACK_END_URL)
    const modal = ref(false)
    const store = useStore()
    const loading = ref(false)
    const noDataMsg = ref(false)
    //const filter = ref('')
    const input = ref({
      type: null,
      date: null,
      offsetInHours: null,
    })
    const temp = ref('-')
    const humid = ref('-')

    socket.on('humid:update', (msg) => {
      humid.value = msg.value
    })

    socket.on('temp:update', (msg) => {
      temp.value = msg.value
    })

    const enable = computed(() => input.value.type && input.value.date)

    const requests = computed(
      () => {
        return store.getters['database/getData']

        // return store.getters['database/getData'].filter((request) =>
        //   request.parameter.includes(filter.value)
        // )
      }

      // .filter((request) => request.fio.includes(filter.value.name))
      // .filter((request) => request.status.includes(filter.value.status))
    )

    return {
      modal,
      requests,
      loading,
      //filter,
      input,
      temp,
      humid,
      enable,
      noDataMsg,
      makeRequest: async () => {
        modal.value = false
        loading.value = true
        await store.dispatch('database/report', input.value)
        loading.value = false
        if (requests.value.length !== 0) {
          noDataMsg.value = false
        } else {
          noDataMsg.value = true
        }
      },
    }
  },
}
</script>
