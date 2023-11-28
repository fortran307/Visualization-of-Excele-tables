<template>
  <div class="container-fluid bg-body mt-3">
    <div class="container mt-5" v-if="data.length === 0">
      <formInput @load-file="handleFileUpload" />
    </div>
    
    <div v-else>
      <ul class="nav nav-tabs justify-content-end">
        <li class="nav-item" v-for="sheet in data">
          <button 
            class="nav-link" 
            :class="currentSheet === data.indexOf(sheet)? 'active' : ''"
            @click.prevent="changeSheet(data.indexOf(sheet))"  
          >{{ sheet.sheet }}</button>
        </li>
      </ul>
      <listThemes :data="dataSheet" @selectQuestion="selectQuestion" />
      <modalWindow :currentQuestion="selectedQuestion">
        <chart v-if="chartData" :chart-data="chartData" />
      </modalWindow>
    </div>
  </div>
</template>
<!-- Мы ничего не передаем на начальном этапе на отрисовку. Без v-if получим ошибку от ChartJS -->

<script>
import axios from "axios";
import formInput from "./components/FormInput";
import listThemes from "./components/ListThemes.vue";
import modalWindow from "./components/ModalWindow.vue";
import chart from "./components/Chart.vue";

export default {
  components: { formInput, modalWindow, chart, listThemes },
  data() {
    return {
      data: new Array(),
      selectedQuestion: null,
      chartData: {
        labels: new Array(),
        datasets: new Array(),
      },
      currentSheet: 0
    }
  },
  computed: {
    dataSheet(){
      return this.data[this.currentSheet].data
    }
  },
  methods: {
    changeSheet(newSheet){
      this.currentSheet = newSheet
    },
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
      this.selectedQuestion = details.question;
      this.chartData = {
        labels: details.answers[0].history.map((item) => item.date),
        datasets: details.answers.map((element, index) => {
          return {
            label: element.answer,
            data: element.history.map((item) => item.percentage),
          };
        }),
      };
    },
  },
};
</script>