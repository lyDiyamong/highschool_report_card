<template>
  <div>
    <!-- Table Section -->
    <div class="bg-white p-6 rounded-lg shadow overflow-x-auto">
      <section class="mb-6">
        <h2 class="text-lg font-semibold">Gender Report of the Survey</h2>
        <p class="text-gray-500">
          Analyzing Gender Distribution in Survey Responses
        </p>
      </section>

      <div v-if="loadingState.dwdSurvey" class="text-center py-4">
        Loading...
      </div>
      <table v-else class="w-full border-collapse">
        <thead>
          <tr>
            <th class="border p-2" rowspan="2">No</th>
            <th class="border p-2 bg-blue-50" rowspan="2">Description</th>
            <th class="border p-2" colspan="4">Student</th>
            <th class="border p-2" colspan="4">Professional Worker</th>
            <th class="border p-2 text-red-600" colspan="4">
              Unclassified <span class="text-gray-400 text-sm">(Unknown)</span>
            </th>
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
            <th class="border p-2">Male</th>
            <th class="border p-2">Female</th>
            <th class="border p-2">Gender Cannot Disaggregate</th>
            <th class="border p-2 bg-blue-50">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dwdSurveyData" :key="index">
            <td class="border p-2 text-center">{{ index + 1 }}</td>
            <td class="border p-2 bg-blue-50">{{ item.surveyName }}</td>
            <td class="border p-2 text-center">
              {{ item.studentDetails.male }}
            </td>
            <td class="border p-2 text-center">
              {{ item.studentDetails.female }}
            </td>
            <td class="border p-2 text-center">
              {{ item.studentDetails.other }}
            </td>
            <td class="border p-2 text-center bg-blue-50">
              {{ item.studentDetails.total }}
            </td>
            <td class="border p-2 text-center">
              {{ item.professionalDetails.male }}
            </td>
            <td class="border p-2 text-center">
              {{ item.professionalDetails.female }}
            </td>
            <td class="border p-2 text-center">
              {{ item.professionalDetails.other }}
            </td>
            <td class="border p-2 text-center bg-blue-50">
              {{ item.professionalDetails.total }}
            </td>
            <td class="border p-2 text-center">
              {{ item.otherDetails.male }}
            </td>
            <td class="border p-2 text-center">
              {{ item.otherDetails.female }}
            </td>
            <td class="border p-2 text-center">
              {{ item.otherDetails.other }}
            </td>
            <td class="border p-2 text-center bg-blue-50">
              {{ item.otherDetails.total }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="font-semibold">
            <td class="border p-2 text-right" colspan="2">Total:</td>
            <td class="border p-2 text-center bg-blue-50" colspan="12">
              {{ grandTotal }}
              <span class="text-gray-400 text-sm">(All genders count)</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useDwdSurveyStore } from "../stores/dwd-report/dwdSurveyClickhouse";

const store = useDwdSurveyStore();
const { dwdSurveyData, loadingState } = storeToRefs(store);

// Calculate grand total
const grandTotal = computed(() => {
  return (
    dwdSurveyData.value?.reduce((sum, item) => {
      return (
        sum +
        parseInt(item.studentDetails.total) +
        parseInt(item.professionalDetails.total) +
        parseInt(item.otherDetails.total)
      );
    }, 0) || 0
  );
});

onMounted(async () => {
  await store.fetchDwdSurvey();
});
</script>
