<template>
  <div class="survey-report">
    <!-- Gender Summary with Chart -->
    <div class="bg-white p-6 rounded-lg shadow mb-6">
      <h3 class="text-xl font-semibold mb-4">Gender Distribution</h3>
      <div class="grid grid-cols-2 gap-6">
        <!-- Chart -->
        <div class="col-span-1">
          <GenderPieChart :male="876" :female="923" :other="45" />
        </div>
        <!-- Stats -->
        <div class="col-span-1 grid grid-cols-2 gap-4">
          <div class="bg-blue-100 p-4 rounded-lg">
            <h3 class="font-semibold text-blue-800">Male</h3>
            <p class="text-2xl font-bold text-blue-900">876</p>
          </div>
          <div class="bg-pink-100 p-4 rounded-lg">
            <h3 class="font-semibold text-pink-800">Female</h3>
            <p class="text-2xl font-bold text-pink-900">923</p>
          </div>
          <div class="bg-purple-100 p-4 rounded-lg">
            <h3 class="font-semibold text-purple-800">Cannot Disaggregate</h3>
            <p class="text-2xl font-bold text-purple-900">45</p>
          </div>
          <div class="bg-gray-100 p-4 rounded-lg">
            <h3 class="font-semibold text-gray-800">Total</h3>
            <p class="text-2xl font-bold text-gray-900">1,844</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Survey Categories -->
    <div class="grid grid-cols-3 gap-6">
      <div
        v-for="(item, index) in surveyData"
        :key="index"
        class="bg-white p-6 rounded-lg shadow"
      >
        <h3 class="font-semibold text-gray-700">{{ item.category }}</h3>
        <p class="text-2xl font-bold text-gray-900 mt-2">{{ item.count }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GenderPieChart from "./GenderPieChart.vue";

const surveyData = [
  { category: "Apply CV", count: 345 },
  { category: "Ask for or consult about job information", count: 567 },
  { category: "Ask for academic information", count: 234 },
  { category: "Edit CV/Cover Letter", count: 189 },
  { category: "Create/prepare CV/Cover Letter", count: 278 },
  { category: "Job announcement", count: 456 },
  { category: "Employee Recruitment", count: 167 },
  { category: "Others", count: 89 },
];
</script>
