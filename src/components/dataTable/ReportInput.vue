<template>
  <div class="form-control">
    <label for="type">Тип отчёта</label>
    <select id="type" v-model="reportType">
      <option disabled selected value="month">Выберите тип отчёта:</option>
      <option value="month">Месячный</option>
      <option value="week">Недельный</option>
      <option value="date">Дневной</option>
    </select>
  </div>
  <div v-if="reportType" class="form-control">
    <label for="date">{{ typeMap[reportType] }}</label>
    <input id="date" :type="reportType" v-model="dateStart" />
  </div>
  <!-- </form> -->
</template>

<script>
import dateFormat from 'dateformat'
import { ref, computed, watch, reactive } from 'vue'
export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup(_, { emit }) {
    const d = new Date()
    const timeEnd = ref(d.toLocaleTimeString().slice(0, -3))
    const reportType = ref('')
    const typeMap = reactive({
      week: 'Введите неделю',
      month: 'Введите месяц',
      date: 'Введите день',
    })
    const dateStart = ref('')
    const dateEnd = ref(dateFormat(d, 'isoDate'))
    const timeStart = ref('')
    const allIuputs = computed(() => {
      return {
        timeEnd: timeEnd.value,
        dateStart: dateStart.value,
        dateEnd: dateEnd.value,
        timeStart: timeStart.value,
      }
    })

    watch(allIuputs, (values) => {
      emit('update:modelValue', {
        startDT: Date.parse(values.dateStart + 'T' + values.timeStart),
        endDT: Date.parse(values.dateEnd + 'T' + values.timeEnd),
      })
    })

    return {
      timeEnd,
      dateStart,
      dateEnd,
      timeStart,
      allIuputs,
      reportType,
      typeMap,
    }
  },
}
</script>

<style></style>
