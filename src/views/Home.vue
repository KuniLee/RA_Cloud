<template>
  <app-loader v-if="loading"></app-loader>
  <app-page v-else title="Список заявок">
    <template #header>
      <button class="btn primary" @click="modal = true">
        Создать
      </button>
    </template>
    <request-filter v-model="filter"></request-filter>
    <request-table :requests="requests"></request-table>

    <teleport to="body">
      <app-model v-if="modal" title="Создать заявку" @close="modal = false"
        ><request-modal @created="modal = false"></request-modal
      ></app-model>
    </teleport>
  </app-page>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import RequestTable from '../components/request/RequestTable.vue'
import AppPage from '../components/ui/AppPage.vue'
import AppModel from '../components/ui/AppModel.vue'
import RequestFilter from '../components/request/RequestFilter.vue'
import RequestModal from '../components/request/RequestModal.vue'
import AppLoader from '../components/ui/AppLoader.vue'
import { useStore } from 'vuex'

export default {
  name: 'Home',
  components: {
    AppPage,
    RequestTable,
    AppModel,
    RequestModal,
    AppLoader,
    RequestFilter,
  },
  setup() {
    const modal = ref(false)
    const store = useStore()
    const loading = ref(false)
    const filter = ref({ name: '', status: '' })

    onMounted(async () => {
      loading.value = true
      //await store.dispatch('request/load')
      loading.value = false
    })

    const requests = computed(() =>
      store.getters['request/requests']
        .filter((request) => request.fio.includes(filter.value.name))
        .filter((request) => request.status.includes(filter.value.status))
    )

    return {
      modal,
      requests,
      loading,
      filter,
    }
  },
}
</script>
