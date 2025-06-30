<template>
  <v-card class="pa-4 mb-4">
    <canvas ref="chartCanvas"></canvas>
  </v-card>
</template>

<script setup>
import { Chart } from 'chart.js'
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  data: Array,
  chartField: String,
  labelField: String,
  chartType: {
    type: String,
    default: 'bar'
  },
  chartTitle: String
});

const chartCanvas = ref(null)
let chartInstance = null

const initChart = () => {
  if (!props.data || props.data.length === 0) return
  
  const labels = props.data.map(item => item[props.labelField])
  const chartData = props.data.map(item => item[props.chartField])
  
  const ctx = chartCanvas.value.getContext('2d')
  
  if (chartInstance) {
    chartInstance.destroy()
  }
  console.log(chartData)
  chartInstance = new Chart(ctx, {
    type: props.chartType,
    data: {
      labels: labels,
      datasets: [{
        label: props.chartTitle,
        data: chartData,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
}

onMounted(initChart);

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
});

watch(() => props.data, initChart, { deep: true });
</script>