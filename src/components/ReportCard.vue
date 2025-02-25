<template>
  <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
    <div class="flex justify-between items-start mb-6">
      <div>
        <h1 class="text-xl">{{ anotherStudentData?.studentLastName }}</h1>
        <h1 class="text-3xl font-bold text-red-800">REPORT CARD</h1>
        <p class="text-gray-600">MONTH: {{ currentMonth }}</p>
      </div>
      <div class="w-32">
        <img :src="studentData.photo" alt="Student Photo" class="rounded" v-if="studentData.photo" />
        <a-upload-dragger v-else v-model:fileList="fileList" name="file" action="/upload">
          <p class="text-sm">Student Photo</p>
        </a-upload-dragger>
      </div>
    </div>

    <div class="mb-6">
      <p><span class="font-semibold">Student Name:</span> {{ studentData.name }}</p>
      <p><span class="font-semibold">Student ID:</span> {{ studentData.id }}</p>
      <p><span class="font-semibold">EYC Level:</span> {{ studentData.level }}</p>
      <p><span class="font-semibold">Total Student:</span> {{ studentData.totalStudents }} students</p>
      <p><span class="font-semibold">Total Female:</span> {{ studentData.totalFemale }} students</p>
    </div>

    <!-- Score Table -->
    <table class="w-full mb-6 border-collapse">
      <thead class="bg-red-800 text-white">
        <tr>
          <th class="border p-2 text-left">SUBJECT</th>
          <th class="border p-2">SCORE</th>
          <th class="border p-2">GRADE</th>
          <th class="border p-2">RANK</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="score in studentData.scores" :key="score.subject">
          <td class="border p-2">{{ score.subject }}</td>
          <td class="border p-2 text-center">{{ score.score }}/{{ score.maxScore }}</td>
          <td class="border p-2 text-center">{{ score.grade }}</td>
          <td class="border p-2 text-center" rowspan="4" v-if="score.subject === 'Writing Test'">1</td>
        </tr>
      </tbody>
    </table>

    <!-- Attendance Table -->
    <table class="w-full mb-6 border-collapse">
      <thead class="bg-red-800 text-white">
        <tr>
          <th class="border p-2 text-left">ATTENDANCE</th>
          <th class="border p-2">MARCH</th>
          <th class="border p-2">TOTAL FROM PREVIOUSE MONTHS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border p-2">Present</td>
          <td class="border p-2 text-center">{{ studentData.attendance.present }}</td>
          <td class="border p-2 text-center">{{ studentData.attendance.totalPresent }}</td>
        </tr>
        <tr>
          <td class="border p-2">Absence with Permission</td>
          <td class="border p-2 text-center">{{ studentData.attendance.absenceWithPermission }}</td>
          <td class="border p-2 text-center">{{ studentData.attendance.totalAbsenceWithPermission }}</td>
        </tr>
        <tr>
          <td class="border p-2">Absence without Permission</td>
          <td class="border p-2 text-center">{{ studentData.attendance.absenceWithoutPermission }}</td>
          <td class="border p-2 text-center">{{ studentData.attendance.totalAbsenceWithoutPermission }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Grading Scale -->
    <div class="bg-red-800 text-white p-3 inline-block">
      <p class="font-semibold">GRADING SCALE:</p>
      <div class="text-sm">
        <p>A = 90% - 100%</p>
        <p>B = 80% - 89%</p>
        <p>C = 60% - 79%</p>
        <p>D = 0% - 59%</p>
      </div>
    </div>

    <div class="mt-8 text-right">
      <p class="font-semibold">Van Komphak</p>
      <p class="text-sm">Class Teacher</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StudentReportData } from '../stores/report-cards/reportClickhouse';
import { ref } from 'vue'

interface Score {
  subject: string;
  maxScore: number;
  score: number;
  grade: string;
}

interface Attendance {
  present: number;
  totalPresent: number;
  absenceWithPermission: number;
  totalAbsenceWithPermission: number;
  absenceWithoutPermission: number;
  totalAbsenceWithoutPermission: number;
}

interface StudentData {
  name: string;
  id: string;
  level: string;
  totalStudents: number;
  totalFemale: number;
  photo?: string;
  scores: Score[];
  attendance: Attendance;
}

const props = defineProps<{
  studentData: StudentData;
  anotherStudentData: any
}>()

const currentMonth = ref(new Date().toLocaleString('default', { month: 'long' }))
const fileList = ref([])
</script>

<style scoped>
.border {
  @apply border-gray-300;
}
</style>