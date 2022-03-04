<template>
  <div>
    <app-loader v-if="loading"></app-loader>
    <app-page back title="Заявка" v-else-if="request">
      <p><strong>Имя владельца</strong>: {{ request.fio }}</p>
      <p><strong>Телефон</strong>: {{ request.phone }}</p>
      <p><strong>Сумма</strong>: {{ currency(request.amount) }}</p>
      <p>
        <strong>Статус</strong>:<app-status :type="request.status"></app-status>
      </p>
      <div :class="['form-control']">
        <select id="status" v-model="status">
          <option value="done">Завершен</option>
          <option value="cancelled">Отменен</option>
          <option value="active">Активен</option>
          <option value="pending">Выполняется</option>
        </select>
      </div>
      <button class="btn danger" @click="remove">Удалить</button>
      <button v-if="hasChanged" class="btn" @click="update">Обновить</button>
    </app-page>
    <h3 v-else class="text-white text-center">
      Заявки с ID = {{ route.params.id }} нет
    </h3>
  </div>
</template>

<script>
import { currency } from '../utils/currency'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import AppPage from '../components/ui/AppPage.vue'
import { useStore } from 'vuex'
import AppLoader from '../components/ui/AppLoader.vue'
import AppStatus from '../components/ui/AppStatus.vue'
export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const loading = ref(true)
    const request = ref({})
    const status = ref()
    onMounted(async () => {
      loading.value = true
      request.value = await store.dispatch('request/loadById', route.params.id)
      status.value = request.value?.status
      loading.value = false
    })
    const hasChanged = computed(() => request.value.status !== status.value)

    return {
      hasChanged,
      currency,
      loading,
      request,
      remove: async () => {
        await store.dispatch('request/removeById', route.params.id)
        router.push('/')
      },
      update: async () => {
        await store.dispatch('request/update', [
          {
            ...request.value,
            status: status.value,
          },
          route.params.id,
        ])
        request.value.status = status.value
      },
      status,
    }
  },
  components: { AppPage, AppLoader, AppStatus },
}
</script>

<style></style>
