<template>
  <div class="flex justify-between gap-4">
    <!-- Grade Scale Overview -->
    <div class="mt-2 w-full">
      <div class="text-sm">
        <table class="w-full border-collapse">
          <thead>
            <tr>
              <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                Mark Obtained
              </th>
              <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                Grade
              </th>
              <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                Grade Point Average
              </th>
              <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                Meaning
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="grade in gradeScale" :key="grade.mark">
              <td class="border border-gray-300 p-2">{{ grade.mark }}</td>
              <td class="border border-gray-300 p-2">{{ grade.grade }}</td>
              <td class="border border-gray-300 p-2">{{ grade.gpa }}</td>
              <td class="border border-gray-300 p-2">{{ grade.meaning }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Reference Grade Scale -->
    <div class="mt-8 w-full flex flex-col items-center">
        <h4 class="font-bold">Phnom Penh, February 24, 2025 </h4>
        <h4 class="font-bold">Director of Teacher Education College</h4>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const gradeScale = ref([
  { mark: "85%-100%", grade: "A", gpa: "4.00", meaning: "Excellent" },
  { mark: "80%-84%", grade: "B+", gpa: "3.50", meaning: "Very Good" },
  { mark: "70%-79%", grade: "B", gpa: "3.00", meaning: "Good" },
  { mark: "65%-69%", grade: "C+", gpa: "2.50", meaning: "Fairly Good" },
  { mark: "50%-64%", grade: "C", gpa: "2.00", meaning: "Fair" },
  { mark: "45%-49%", grade: "D", gpa: "1.50", meaning: "Poor" },
  { mark: "40%-44%", grade: "E", gpa: "1.00", meaning: "Very Poor" },
  { mark: "<40%", grade: "F", gpa: "0.00", meaning: "Failure" },
]);
</script>
