<template>
  <app-page back title="Помощь">
    <question-item
      :question="q"
      v-for="q in questions"
      :key="q.title"
    ></question-item>
  </app-page>
  <div></div>
</template>

<script>
import QuestionItem from '../components/questions/QuestionItem.vue'
import AppPage from '../components/ui/AppPage.vue'

export default {
  setup() {
    const questions = [
      {
        title: 'Что?',
        text:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, animi distinctio. Magni animi praesentium, nesciunt blanditiis eligendi facilis aut similique!',
      },
      {
        title: 'Где?',
        text:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, animi distinctio. Magni animi praesentium, nesciunt blanditiis eligendi facilis aut similique!',
      },
    ]
    return { questions }
  },
  components: { AppPage, QuestionItem },
}
</script>
