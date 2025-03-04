<template>
  <main class="p-6 bg-white rounded-lg shadow-sm flex flex-col gap-6">
    <section>
      <h2 class="font-semibold text-lg">
        Yearly - Calculation the total of the year
      </h2>
      <p class="text-gray-500">
        The calculation of the semester I and II to see the average of the year.
      </p>
    </section>

    <div class="yearly-report bg-white rounded-lg shadow-sm">
      <table class="w-full border-collapse">
        <thead class="bg-gray-50">
          <tr>
            <th class="border p-3">Subject</th>
            <th class="border p-3 bg-green-50">Yearly Score</th>
            <th class="border p-3">Re-exam</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="subject in yearlyData" :key="subject.name">
            <td class="border p-3 font-medium">{{ subject.name }}</td>
            <td class="border p-3 text-center bg-green-50">
              {{ subject.yearlyScore }}
            </td>
            <td class="border p-3 text-center">{{ subject.reExam }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup lang="ts">
const yearlyData = [
  {
    name: "Math",
    yearlyScore: 71.0625,
    reExam: null,
  },
  {
    name: "Khmer",
    yearlyScore: 84.19,
    reExam: null,
  },
  {
    name: "English",
    yearlyScore: 89.88,
    reExam: null,
  },
  {
    name: "Physics",
    yearlyScore: 79.88,
    reExam: null,
  },
];
</script>
