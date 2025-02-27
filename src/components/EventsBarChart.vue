<template>
  <div class="chart-container">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps<{
  data: Array<{ title: string; count: number }>;
}>();

const chartData = {
  labels: props.data.map(item => item.title),
  datasets: [
    {
      label: 'Number of Events',
      data: props.data.map(item => item.count),
      backgroundColor: '#3B82F6',
      borderRadius: 6,
    }
  ]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Events Distribution'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 20
      }
    }
  }
};
</script>

<style scoped>
.chart-container {
  height: 400px;
  width: 100%;
  margin: 0 auto;
}
</style> 