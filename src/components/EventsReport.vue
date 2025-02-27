<template>
  <div class="events-report">
    <!-- Chart Section -->
    <div class="bg-white p-6 rounded-lg shadow mb-6">
      <h3 class="text-xl font-semibold mb-4">Events Distribution</h3>
      <EventsBarChart :data="eventStats" />
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-3 gap-6">
      <div
        v-for="(stat, index) in eventStats"
        :key="index"
        class="bg-white p-6 rounded-lg shadow"
      >
        <h3 class="text-lg font-semibold text-gray-700">{{ stat.title }}</h3>
        <p class="text-3xl font-bold text-blue-600 mt-2">{{ stat.count }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EventsBarChart from "./EventsBarChart.vue";

const eventStats = [
  { title: "Soft Skill Event(s)", count: 45 },
  { title: "Hard Skill Event(s)", count: 38 },
  { title: "Social Event(s)", count: 25 },
  { title: "Networking Event(s)", count: 32 },
  { title: "Mentoring Event(s)", count: 18 },
  { title: "Other Event(s)", count: 12 },
  { title: "Job Vacancy Posted", count: 156 },
];
</script>
