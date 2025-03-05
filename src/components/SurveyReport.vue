<template>
  <div class="survey-report">
    <!-- Gender Summary with Chart -->
    <div class="bg-white p-6 rounded-lg shadow mb-6">
      <h3 class="text-xl font-semibold mb-4">Gender Distribution</h3>
      <!-- Chart -->
      <div class="w-full">
        <GenderPieChart :male="876" :female="923" :other="45" />
      </div>
    </div>

    <!-- Table Section -->
    <div class="bg-white p-6 rounded-lg shadow overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th class="border p-2" rowspan="2">No</th>
            <th class="border p-2 bg-blue-50" rowspan="2">Description</th>
            <th class="border p-2" colspan="4">Student</th>
            <th class="border p-2" colspan="4">Professional Worker</th>
          </tr>
          <tr>
            <th class="border p-2">Male</th>
            <th class="border p-2">Female</th>
            <th class="border p-2">Gender Cannot Disaggregate</th>
            <th class="border p-2 bg-blue-50">Total</th>
            <th class="border p-2">Male</th>
            <th class="border p-2">Female</th>
            <th class="border p-2">Gender Cannot Disaggregate</th>
            <th class="border p-2 bg-blue-50">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in surveyData" :key="index">
            <td class="border p-2 text-center">{{ index + 1 }}</td>
            <td class="border p-2 bg-blue-50">{{ item.category }}</td>
            <td class="border p-2 text-center">0</td>
            <td class="border p-2 text-center">0</td>
            <td class="border p-2 text-center">0</td>
            <td class="border p-2 text-center bg-blue-50">0</td>
            <td class="border p-2 text-center">0</td>
            <td class="border p-2 text-center">0</td>
            <td class="border p-2 text-center">0</td>
            <td class="border p-2 text-center bg-blue-50">0</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import GenderPieChart from "./GenderPieChart.vue";

const surveyData = [
  { category: "Apply CV" },
  { category: "Ask for or consult about job information" },
  { category: "Ask for academic information" },
  { category: "Edit CV/Cover Letter" },
  { category: "Create/prepare CV/Cover Letter" },
  { category: "Job announcement" },
  { category: "Employee Recruitment" },
  { category: "Others" },
];
</script>
