<template>
  <div class="events-report">
    <!-- Filter Section -->
    <div class="bg-white p-6 rounded-lg shadow overflow-x-auto">
      <div class="text-lg font-semibold mb-4">Reporting Period</div>
      <table class="w-full border-collapse my-4">
        <tr>
          <td class="border p-2 bg-blue-50">CC Location (branch)</td>
        </tr>
      </table>

      <!-- Events Table -->
      <table class="w-full border-collapse mt-6">
        <thead>
          <tr>
            <th class="border p-2">No</th>
            <th class="border p-2 bg-blue-50">Description</th>
            <th class="border p-2 bg-blue-50">Count</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stat, index) in eventStats" :key="index">
            <td class="border p-2 text-center">{{ index + 1 }}</td>
            <td class="border p-2 bg-blue-50">{{ stat.title }}</td>
            <td class="border p-2 text-center bg-blue-50">{{ stat.count }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
interface EventStat {
  title: string;
  count: number;
}

const eventStats: EventStat[] = [
  { title: "Soft skill event(s)", count: 45 },
  { title: "Hard skill event(s)", count: 38 },
  { title: "Social event(s)", count: 25 },
  { title: "Networking event(s)", count: 32 },
  { title: "Mentoring event(s)", count: 18 },
  { title: "Other event(s)", count: 12 },
  { title: "Job vacancy posted", count: 156 },
];
</script>
