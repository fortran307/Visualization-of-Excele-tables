<template>
  <div class="container-fluid bg-body">
    <loadWindow v-if="loadData" />
    <div class="container mt-5" v-if="data.length === 0">
      <mainPage />

      <modalWindow :title="`Как пользоваться Графиком?`">
        <manualPage />
      </modalWindow>

      <formInput @load-file="handleFileUpload" />
    </div>

    <div v-else>
      <listSheets
        :sheets="data"
        :currentSheet="currentSheet"
        @changeSheet="changeSheet"
      />
      <listThemes :data="dataSheet" @selectQuestion="selectQuestion" />

      <modalWindow :title="selectedQuestion">
        <chart v-if="chartData" :chart-data="chartData" />
      </modalWindow>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import formInput from "./components/FormInput"
import listThemes from "./components/ListThemes.vue"
import modalWindow from "./components/ModalWindow.vue"
import listSheets from "./components/ListSheets.vue"
import loadWindow from "./components/LoadWindow.vue"
import manualPage from "./page/ManualPage.vue"
import mainPage from "./page/FirstPage.vue"
import chart from "./components/Chart.vue"

export default {
  components: {
    formInput,
    modalWindow,
    chart,
    listThemes,
    listSheets,
    loadWindow,
    manualPage,
    mainPage,
  },
  data() {
    return {
      data: new Array(),
      selectedQuestion: null,
      chartData: {
        labels: new Array(),
        datasets: new Array(),
      },
      currentSheet: 0,
      loadData: false,
    };
  },
  computed: {
    dataSheet() {
      return this.data[this.currentSheet].data
    },
  },
  methods: {
    changeSheet(newSheet) {
      this.currentSheet = newSheet
    },
    async handleFileUpload(file) {
      this.loadData = true
      let formData = new FormData()
      formData.append("table", file)

      try {
        const resFile = await axios.post(
          "http://localhost:5000/loadTable",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        this.data = resFile.data
        setTimeout(() => {
          this.loadData = false
        }, 1500);
      } catch (error) {
        console.error(error.message)
      }
    },
    selectQuestion(details) {
      // Проходим по всем массивам ответов и находим самый длинный массив
      const longLabels = details.answers.reduce((acc, curr) => curr.history.length > acc.history.length ? curr : acc)

      this.selectedQuestion = details.question
      this.chartData = {
        labels: longLabels.history.map((item) => item.date),
        datasets: details.answers.map((element) => {
          return {
            label: element.answer,
            data: element.history.map((item) => item.percentage),
          }
        })
      }
    }
  }
}
</script>
