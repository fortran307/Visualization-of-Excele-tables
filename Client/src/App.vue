<template>
  <div class="container-fluid bg-body mt-3">
    <div class="container mt-5" v-if="data.length === 0">
      <formInput @load-file="handleFileUpload" />
    </div>

    <div v-else>
      <listThemes :data="data" @selectQuestion="selectQuestion" />
      <modalWindow :currentQuestion="selectedQuestion">
        <chart v-if="chartData" :chart-data="chartData" />
      </modalWindow>
    </div>
  </div>
</template>
<!-- Мы ничего не передаем на начальном этапе на отрисовку. Без v-if получим ошибку от ChartJS -->
<!-- ChartJS динамически перерисовывает картнку благодаря миксину от vue-ChartJS (иначе он не перерисовал бы) -->

<script>
import axios from "axios";
import formInput from "./components/FormInput";
import listThemes from "./components/ListThemes.vue";
import modalWindow from "./components/ModalWindow.vue";
import chart from "./components/Chart.vue";

import colorLine from "@/data/colorLine";

export default {
  components: { formInput, modalWindow, chart, listThemes },
  data() {
    return {
      data: new Array(),
      selectedQuestion: null,
      chartData: null,
    };
  },
  methods: {
    async handleFileUpload(file) {
      let formData = new FormData();
      formData.append("table", file);

      try {
        const resFile = await axios.post(
          "http://localhost:5000/loadTable",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.data = resFile.data;
      } catch (error) {
        console.error(error.message);
      }
    },
    selectQuestion(details) {
      console.log(details.answers[0]);
      this.selectedQuestion = details.question;
      this.chartData = {
        labels: details.answers[0].history.map((item) => item.date),
        datasets: details.answers.map((element, index) => {
          return {
            label: element.answer,
            data: element.history.map((item) => item.percentage),
            backgroundColor: colorLine[index].backgroundColor,
            borderColor: colorLine[index].borderColor,
            fill: false,
          };
        }),
      };
    },
  },
};
</script>