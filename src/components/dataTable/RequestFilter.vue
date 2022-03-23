<template>
  <div class="form-control">
    <label for="type">Параметр:</label>
    <select id="param" v-model="topic">
      <option id="param" disabled selected value="">Выберите параметр</option>
      <option value="">Всё</option>
      <option value="temp">Температура</option>
      <option value="humid">Влажность</option>
      <!-- <option value="active">Активен</option>
        <option value="pending">Выполняется</option> -->
    </select>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup(_, { emit }) {
    const topic = ref('')
    watch(topic, (values) => {
      emit('update:modelValue', values)
    })
    //const isActive = computed(() => name.value || status.value)
    return {
      topic,
      //isActive,
      // reset: () => {
      //   name.value = ''
      //   status.value = null
      // },
    }
  },
}
</script>

<style></style>
