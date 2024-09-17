<template>
  <Line :options="chartOptions" :data="chartData" />
  <!-- <div style="width: 100%; overflow-x: auto;">
    <div :style="{width: (chartData.labels.length * 40) + 'px', height: '650px'}">
      <Line :options="chartOptions" :data="chartData" />
    </div>
  </div> -->
</template>

<script>
import { Line } from "vue-chartjs";
import Chart from "chart.js/auto";
import autocolors from 'chartjs-plugin-autocolors';
Chart.register(autocolors);

export default {
  name: "LineChart",
  components: { Line },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      default: () => {
        return {
          responsive: true,
          plugins: {
            colors: {
              forceOverride: true,
              enabled: false
            },
            autocolors
          }
        }
      }
    },
  },
}
</script>