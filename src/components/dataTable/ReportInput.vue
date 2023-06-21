<template>
  <div class="form-control">
    <label for="type">Тип отчёта</label>
    <select id="type" v-model="reportType">
      <option disabled selected value="null">Выберите тип отчёта:</option>
      <option value="month">Месячный</option>
      <option value="week">Недельный</option>
      <option value="date">Дневной</option>
    </select>
  </div>
  <div v-if="reportType" class="form-control">
    <label for="date">{{ typeMap[reportType] }}</label>
    <input id="date" v-model="inputDate" :type="reportType" />
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { dateFromWeek } from '../../utils/dateFromWeek'
import { ref, computed, watch, reactive, onMounted } from 'vue'
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],

  setup(_, { emit }) {
    const reportType = ref('')

    const typeMap = reactive({
      week: 'Введите неделю',
      month: 'Введите месяц',
      date: 'Введите день',
    })
    const inputDate = ref('')

    const allIuputs = computed(() => {
      return {
        inputDate: inputDate.value,
        reportType: reportType.value,
      }
    })

    const getTimeZone = () => {
      const offset = +-new Date().getTimezoneOffset()
      let mins = Math.abs(offset) % 60
      let hours = (Math.abs(offset) - mins) / 60

      if (mins < 10) mins = '0' + mins
      if (Math.sign(offset) === -1) hours = '-' + hours
      else hours = '+' + hours

      return hours + ':' + mins
    }

    onMounted(() => {
      inputDate.value = null
      reportType.value = null
    })

    watch(allIuputs, (values) => {
      let input = values.inputDate

      if (values.reportType === 'week') input = dateFromWeek(values.inputDate)
      if (values.reportType === 'month' && values.inputDate) input = values.inputDate + '-01'

      emit('update:modelValue', {
        type: values.reportType,
        date: input,
        offsetInHours: getTimeZone(),
      })
    })

    return {
      inputDate,
      allIuputs,

      reportType,
      typeMap,
    }
  },
}
</script>

<style></style>
