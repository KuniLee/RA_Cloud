<template>
  <h4 v-if="requests.length === 0" class="text-center">Заявок пока нет</h4>
  <table v-else class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>ФИО</th>
        <th>Телефон</th>
        <th>Сумма</th>
        <th>Статус</th>
        <th>Действия</th>
      </tr>
    </thead>
    <thead>
      <tr v-for="(r, idx) in requests" :key="r.id">
        <th>{{ idx + 1 }}</th>
        <th>{{ r.fio }}</th>
        <th>{{ r.phone }}</th>
        <th>{{ currency(r.amount) }}</th>
        <th><app-status :type="r.status"></app-status></th>
        <th>
          <router-link
            v-slot="{ navigate }"
            custom
            :to="{ name: 'Request', params: { id: r.id } }"
          >
            <button class="btn" @click="navigate">Открыть</button>
          </router-link>
        </th>
      </tr>
    </thead>
  </table>
</template>

<script>
import AppStatus from '../ui/AppStatus.vue'
import { currency } from '../../utils/currency'
export default {
  props: ['requests'],

  setup() {
    return {
      currency,
    }
  },
  components: { AppStatus },
}
</script>

<style></style>
