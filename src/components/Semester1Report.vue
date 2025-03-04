<template>
  <main class="p-6 bg-white rounded-lg shadow-sm flex flex-col gap-6" >
    <section>
        <h2 class="font-semibold text-lg">Semester I - Calculation by Subjects</h2>
        <p class="text-gray-500">The calculation of the semester I to see the average of the semester.</p>
    </section>
    <section class="semester1-report bg-white rounded-lg shadow-sm">
      <table class="w-full border-collapse">
        <thead class="bg-gray-50">
          <tr>
            <th class="border p-3">Subject</th>
            <th class="border p-3">Jan</th>
            <th class="border p-3">Feb</th>
            <th class="border p-3">Marc</th>
            <th class="border p-3">April</th>
            <th class="border p-3 bg-blue-50">Semester Score by Subject</th>
            <th class="border p-3 bg-blue-50">Exam Semester</th>
            <th class="border p-3 bg-blue-50">Semester 1 Score</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="subject in semesterData" :key="subject.name">
            <td class="border p-3 font-medium">{{ subject.name }}</td>
            <td class="border p-3 text-center">{{ subject.jan }}</td>
            <td class="border p-3 text-center">{{ subject.feb }}</td>
            <td class="border p-3 text-center">{{ subject.mar }}</td>
            <td class="border p-3 text-center">{{ subject.apr }}</td>
            <td class="border p-3 text-center bg-blue-50">
              {{ subject.semesterScore }}
            </td>
            <td class="border p-3 text-center bg-blue-50">
              {{ subject.examScore }}
            </td>
            <td class="border p-3 text-center bg-blue-50">
              {{ subject.finalScore }}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<script setup lang="ts">
const semesterData = [
  {
    name: "Math",
    jan: 60,
    feb: 64,
    mar: 60,
    apr: 90,
    semesterScore: 68.5,
    examScore: 80,
    finalScore: 74.25,
  },
  {
    name: "Khmer",
    jan: 75,
    feb: 82,
    mar: 78,
    apr: 85,
    semesterScore: 80,
    examScore: 85,
    finalScore: 82.5,
  },
  {
    name: "English",
    jan: 88,
    feb: 92,
    mar: 85,
    apr: 90,
    semesterScore: 88.75,
    examScore: 90,
    finalScore: 89.38,
  },
  {
    name: "Physics",
    jan: 70,
    feb: 75,
    mar: 72,
    apr: 78,
    semesterScore: 73.75,
    examScore: 82,
    finalScore: 77.88,
  },
];
</script>
