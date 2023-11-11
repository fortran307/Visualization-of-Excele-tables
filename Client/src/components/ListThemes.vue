<template>
  <div class="d-flex shadow-sm bg-light rounded p-3 mb-3" v-for="item in data">
    <!-- Тема -->
    <div class="mt-4 col-3">
      <h6>{{ item.theme }}</h6>
      <span class="text-muted mt-3">
        Показателей: {{ item.questions.length }}
      </span>
    </div>
    <!-- Вопросы по теме -->
    <ListQuestions :questions="item.questions" @selectQuestion="selectQuestion"/>
  </div>
</template>

<script>
import ListQuestions from './ListQuestions.vue';
export default {
  components: {ListQuestions},
  props: {
    data: Array,
  },
  methods:{ 
    selectQuestion(question){
      this.$emit('selectQuestion', question)
    }
  }
};
</script>