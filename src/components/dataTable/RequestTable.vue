<template>
  <h4 v-if="noteData.length === 0" class="text-center">Нет данных</h4>
  <table v-else class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Параметр</th>
        <th>Время</th>
        <th>Значение</th>
      </tr>
    </thead>
    <thead>
      <tr v-for="(r, idx) in noteData" :key="r.id">
        <th>{{ idx + 1 }}</th>
        <th>{{ r.parameter }}</th>
        <th>{{ date(r.timestamp) }}</th>
        <th>{{ r.value }}</th>
        <!-- <th>{{ currency(r.amount) }}</th> -->
        <!-- <th><app-status :type="r.status"></app-status></th> -->
        <!-- <th>
          <router-link
            v-slot="{ navigate }"
            custom
            :to="{ name: 'Request', params: { id: r.id } }"
          >
            <button class="btn" @click="navigate">Открыть</button>
          </router-link>
        </th> -->
      </tr>
    </thead>
  </table>
</template>

<script>
import dateFormat, { masks } from 'dateformat'
import AppStatus from '../ui/AppStatus.vue'
import { currency } from '../../utils/currency'
export default {
  props: ['noteData'],

  setup(props) {
    return {
      date: (date) => {
        const now = new Date(date * 1000)
        return dateFormat(now, 'dd-mm-yyyy, HH:MM', true)
      },
      currency,
    }
  },
  components: { AppStatus },
}
</script>

<style></style>
