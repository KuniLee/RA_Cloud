<template>
  <app-page title="Реальные значения:">
    <template #header> </template>
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
      <chart v-if="requests.length !== 0 && !loading" :chart-data="requests"></chart>
      <h3 v-if="noDataMsg && !loading" class="text-center text-black">Нет данных</h3>
    </div>

    <teleport to="body">
      <app-model v-if="modal" title="Загрузить данные" @close="modal = false">
        <report-input v-model="input"></report-input>

        <button class="btn danger" :disabled="!enable" @click="makeRequest">Загрузить</button>
      </app-model>
    </teleport>
  </app-page>
</template>

<script lang="ts">
import { io } from 'socket.io-client'
import { ref, computed } from 'vue'
import AppPage from '../components/ui/AppPage.vue'
import AppModel from '../components/ui/AppModel.vue'
import ReportInput from '../components/dataTable/ReportInput.vue'

import AppLoader from '../components/ui/AppLoader.vue'
import Chart from '../components/dataTable/Chart.vue'
import { useDBStore } from '../stores/database'

export default {
  name: 'Home',
  components: {
    AppPage,
    AppModel,
    AppLoader,
    ReportInput,
    Chart,
  },
  setup() {
    const socket = io(import.meta.env.VITE_BACK_END_URL || '')
    const modal = ref(false)
    const store = useDBStore()
    const loading = ref(false)
    const noDataMsg = ref(false)

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

    const requests = computed(() => store.dataBaseData)

    return {
      modal,
      requests,
      loading,
      input,
      temp,
      humid,
      enable,
      noDataMsg,
      makeRequest: async () => {
        modal.value = false
        loading.value = true
        await store.report(input.value)
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
