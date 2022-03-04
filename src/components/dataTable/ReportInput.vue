<template>
  <!-- <h3 class="text-center">Выбрать данные</h3> -->

  <div class="filter">
    <h4 class="text-black">Начало:</h4>
    <div class="form-control">
      <input type="date" v-model="dateStart" />
    </div>
    <div class="form-control">
      <input type="time" v-model="timeStart" />
    </div>
  </div>

  <div class="filter">
    <h4 class="text-black">Конец:</h4>
    <div class="form-control">
      <input type="date" v-model="dateEnd" />
    </div>
    <div class="form-control">
      <input type="time" v-model="timeEnd" />
    </div>
  </div>
</template>

<script>
import dateFormat from 'dateformat'
import { ref, computed, watch } from 'vue'
export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup(_, { emit }) {
    const d = new Date()
    const timeEnd = ref(d.toLocaleTimeString().slice(0, -3))
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
    }
  },
}
</script>

<style></style>
