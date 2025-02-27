<template>
  <div class="participants-report">
    <div class="grid grid-cols-4 gap-4">
      <!-- Gender Summary with Chart -->
      <div class="col-span-4 bg-white p-6 rounded-lg shadow mb-6">
        <h3 class="text-xl font-semibold mb-4">Gender Distribution</h3>
        <div class="grid grid-cols-2 gap-6">
          <!-- Chart -->
          <div class="col-span-1">
            <GenderPieChart :male="1245" :female="1532" :other="89" />
          </div>
          <!-- Stats -->
          <div class="col-span-1 grid grid-cols-2 gap-4">
            <div class="bg-blue-100 p-4 rounded-lg">
              <h3 class="font-semibold text-blue-800">Male</h3>
              <p class="text-2xl font-bold text-blue-900">1,245</p>
            </div>
            <div class="bg-pink-100 p-4 rounded-lg">
              <h3 class="font-semibold text-pink-800">Female</h3>
              <p class="text-2xl font-bold text-pink-900">1,532</p>
            </div>
            <div class="bg-purple-100 p-4 rounded-lg">
              <h3 class="font-semibold text-purple-800">Cannot Disaggregate</h3>
              <p class="text-2xl font-bold text-purple-900">89</p>
            </div>
            <div class="bg-gray-100 p-4 rounded-lg">
              <h3 class="font-semibold text-gray-800">Total</h3>
              <p class="text-2xl font-bold text-gray-900">2,866</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Reports -->
      <div
        v-for="(stat, index) in statistics"
        :key="index"
        class="bg-white p-4 rounded-lg shadow"
      >
        <h3 class="font-semibold text-gray-700">{{ stat.title }}</h3>
        <p class="text-2xl font-bold text-gray-900">{{ stat.count }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GenderPieChart from "./GenderPieChart.vue";

const statistics = [
  { title: "CC visitor", count: 3240 },
  { title: "Participant(s) attended in all event(s)", count: 2866 },
  { title: "Participant(s) attended in soft skill event(s)", count: 856 },
  { title: "Participant(s) attended in hard skill event(s)", count: 945 },
  { title: "Participant(s) attended in mentoring session(s)", count: 234 },
  { title: "Participant(s) attended in networking event(s)", count: 567 },
  { title: "Participant(s) attended in social event(s)", count: 789 },
  { title: "Participant(s) attended in other event(s)", count: 123 },
  { title: "Student(s) applied for job", count: 456 },
  { title: "Student(s) got employed", count: 234 },
];
</script>
