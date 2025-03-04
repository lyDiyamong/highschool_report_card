<template>
  <main class="p-6 bg-white rounded-lg shadow-sm flex flex-col gap-6">
    <section>
      <h2 class="font-semibold text-lg">
        Semester II - Calculation by Subjects
      </h2>
      <p class="text-gray-500">
        The calculation of the semester II to see the average of the semester.
      </p>
    </section>

    <div class="semester2-report bg-white rounded-lg shadow-sm">
      <table class="w-full border-collapse">
        <thead class="bg-gray-50">
          <tr>
            <th class="border p-3">Subject</th>
            <th class="border p-3">May</th>
            <th class="border p-3">Jun</th>
            <th class="border p-3">July</th>
            <th class="border p-3">Aug</th>
            <th class="border p-3 bg-blue-50">Semester Score by Subject</th>
            <th class="border p-3 bg-blue-50">Exam Semester</th>
            <th class="border p-3 bg-blue-50">Semester 2 Score</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="subject in semesterData" :key="subject.name">
            <td class="border p-3 font-medium">{{ subject.name }}</td>
            <td class="border p-3 text-center">{{ subject.may }}</td>
            <td class="border p-3 text-center">{{ subject.jun }}</td>
            <td class="border p-3 text-center">{{ subject.jul }}</td>
            <td class="border p-3 text-center">{{ subject.aug }}</td>
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
    </div>
  </main>
</template>

<script setup lang="ts">
const semesterData = [
  {
    name: "Math",
    may: 65,
    jun: 79,
    jul: 39,
    aug: 40,
    semesterScore: 55.75,
    examScore: 80,
    finalScore: 67.875,
  },
  {
    name: "Khmer",
    may: 80,
    jun: 85,
    jul: 82,
    aug: 88,
    semesterScore: 83.75,
    examScore: 88,
    finalScore: 85.88,
  },
  {
    name: "English",
    may: 85,
    jun: 90,
    jul: 88,
    aug: 92,
    semesterScore: 88.75,
    examScore: 92,
    finalScore: 90.38,
  },
  {
    name: "Physics",
    may: 75,
    jun: 78,
    jul: 80,
    aug: 82,
    semesterScore: 78.75,
    examScore: 85,
    finalScore: 81.88,
  },
];
</script>
