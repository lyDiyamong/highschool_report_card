<template>
  <div class="chart-container">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps<{
  male: number;
  female: number;
  other: number;
}>();

const chartData = {
  labels: ['Male', 'Female', 'Cannot Disaggregate'],
  datasets: [
    {
      backgroundColor: ['#93C5FD', '#FCA5A5', '#C4B5FD'],
      data: [props.male, props.female, props.other]
    }
  ]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const
    }
  }
};
</script>

<style scoped>
.chart-container {
  height: 300px;
  width: 100%;
  margin: 0 auto;
}
</style> 