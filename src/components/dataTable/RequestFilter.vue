<template>
  <div class="filter">
    <!-- <div class="form-control">
      <input type="text" placeholder="Начните писать имя" v-model="name" />
    </div> -->
    <div class="form-control">
      <select v-model="topic">
        <option disabled selected value="">Выберите параметр</option>
        <option value="">Всё</option>
        <option value="temp">Температура</option>
        <option value="humid">Влажность</option>
        <!-- <option value="active">Активен</option>
        <option value="pending">Выполняется</option> -->
      </select>
    </div>
    <!-- <button v-if="isActive" class="btn danger" @click="reset">
      Сброс
    </button> -->
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue'
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
