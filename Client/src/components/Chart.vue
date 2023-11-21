<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Line, mixins } from 'vue-chartjs';
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
})
</script>
