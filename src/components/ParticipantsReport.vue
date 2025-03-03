<template>
  <div class="participants-report">
    <!-- Table Section -->
    <div class="bg-white p-6 rounded-lg shadow overflow-x-auto">
      <div class="text-lg font-semibold mb-4">Filtered by:</div>
      <table class="w-full border-collapse my-4">
        <tr>
          <td class="border p-2 w-1/4 bg-blue-50">Reporting Period</td>
        </tr>
        <tr>
          <td class="border p-2 bg-blue-50">CC Location (branch)</td>
        </tr>
      </table>

      <table class="w-full border-collapse mt-6">
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
          <tr v-for="(stat, index) in statistics" :key="index">
            <td class="border p-2 text-center">{{ index + 1 }}</td>
            <td class="border p-2 bg-blue-50">{{ stat.title }}</td>
            <td class="border p-2 text-center">
              {{ stat.student?.male || 0 }}
            </td>
            <td class="border p-2 text-center">
              {{ stat.student?.female || 0 }}
            </td>
            <td class="border p-2 text-center">
              {{ stat.student?.other || 0 }}
            </td>
            <td class="border p-2 text-center bg-blue-50">
              {{ stat.student?.total || 0 }}
            </td>
            <td class="border p-2 text-center">
              {{ stat.professional?.male || 0 }}
            </td>
            <td class="border p-2 text-center">
              {{ stat.professional?.female || 0 }}
            </td>
            <td class="border p-2 text-center">
              {{ stat.professional?.other || 0 }}
            </td>
            <td class="border p-2 text-center bg-blue-50">
              {{ stat.professional?.total || 0 }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
interface GenderStats {
  male: number;
  female: number;
  other: number;
  total: number;
}

interface StatisticItem {
  title: string;
  student: GenderStats;
  professional: GenderStats;
}

const statistics: StatisticItem[] = [
  {
    title: "Participant(s) attended in all event(s)",
    student: { male: 450, female: 550, other: 25, total: 1025 },
    professional: { male: 250, female: 350, other: 15, total: 615 },
  },
  {
    title: "Participant(s) attended in soft skill event(s)",
    student: { male: 200, female: 250, other: 10, total: 460 },
    professional: { male: 100, female: 150, other: 5, total: 255 },
  },

  {
    title: "Participant(s) attended in hard skill event(s)",
    student: { male: 450, female: 550, other: 25, total: 1025 },
    professional: { male: 250, female: 350, other: 15, total: 615 },
  },
  {
    title: "Participant(s) attended in mentoring session(s)",
    student: { male: 200, female: 250, other: 10, total: 460 },
    professional: { male: 100, female: 150, other: 5, total: 255 },
  },
  {
    title: "Participant(s) attended in networking event(s)",
    student: { male: 450, female: 550, other: 25, total: 1025 },
    professional: { male: 250, female: 350, other: 15, total: 615 },
  },
  {
    title: "Participant(s) attended in social event(s)",
    student: { male: 200, female: 250, other: 10, total: 460 },
    professional: { male: 100, female: 150, other: 5, total: 255 },
  },
  {
    title: "Participant(s) attended in other event(s)",
    student: { male: 450, female: 550, other: 25, total: 1025 },
    professional: { male: 250, female: 350, other: 15, total: 615 },
  },
  {
    title: "Student(s) applied for job",
    student: { male: 200, female: 250, other: 10, total: 460 },
    professional: { male: 100, female: 150, other: 5, total: 255 },
  },
  {
    title: "Student(s) got employed",
    student: { male: 450, female: 550, other: 25, total: 1025 },
    professional: { male: 250, female: 350, other: 15, total: 615 },
  },
];
</script>
