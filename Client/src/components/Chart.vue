<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Line, mixins } from 'vue-chartjs';
import colorLine from '@/data/colorLine';
const { reactiveProp } = mixins

export default defineComponent({
  extends: Line,
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  mixins: [reactiveProp],
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
  //   this.renderChart(
  //     {
  //       labels: this.data[0].history.map(item => item.date),
  //       datasets: this.data.map((element,index) => {
  //         return {
  //           label: element.answer,
  //           data: element.history.map(item => item.percentage),
  //           backgroundColor: colorLine[index].backgroundColor,
  //           borderColor:colorLine[index].borderColor,
  //           fill: false
  //         }
  //       })
  //     },
  //     {
  //       // Настройки графика
  //     }
  //   );
  // },
})
</script>
