<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-4">Loading...</div>

    <!-- Error State -->
    <div v-else-if="error" class="text-red-600 text-center py-4">
      {{ error }}
    </div>

    <!-- Data Display -->
    <div v-else class="bg-white p-6 rounded-lg shadow overflow-x-auto">
      <div class="mb-6">
        <h2 class="text-lg font-semibold">All Events Under DWD Schools</h2>
        <p class="text-gray-500">
          A Comprehensive Overview of Events Across DWD Schools
        </p>
      </div>
      <!-- Events Table -->
      <table class="w-full border-collapse mt-6">
        <thead>
          <tr>
            <th class="border p-2">No</th>
            <th class="border p-2 bg-blue-50">Event(s) conducted</th>
            <th class="border p-2 bg-blue-50">Count</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(stat, index) in getEventsByName" :key="index">
            <td class="border p-2 text-center">{{ index + 1 }}</td>
            <td class="border p-2 bg-blue-50">{{ stat.title }}</td>
            <td class="border p-2 text-center bg-blue-50">
              {{ stat.count }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Report Events in the Specific Campus -->
    <div class="bg-white p-6 rounded-lg shadow overflow-x-auto mt-6">
      <section class="mb-6">
        <h2 class="text-lg font-semibold">Campus-Specific Events Report</h2>
        <p class="text-gray-500">View Events Data for Individual Campuses</p>
      </section>

      <!-- Campus Selector -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Select Campus
        </label>
        <select
          v-model="selectedCampus"
          class="w-full md:w-64 border rounded-md p-2 bg-white"
          @change="handleCampusChange"
        >
          <option value="">All Campuses</option>
          <option
            v-for="[id, campus] in Object.entries(getCampusEvents)"
            :key="id"
            :value="id"
          >
            {{ campus.name }}
          </option>
        </select>
      </div>

      <!-- Campus Events Table -->
      <table v-if="selectedCampus" class="w-full border-collapse mt-4">
        <thead>
          <tr>
            <th class="border p-2">No</th>
            <th class="border p-2 bg-blue-50">Event(s) conducted</th>
            <th class="border p-2 bg-blue-50">Count</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(event, index) in getCampusEvents[selectedCampus]?.events"
            :key="index"
          >
            <td class="border p-2 text-center">{{ index + 1 }}</td>
            <td class="border p-2 bg-blue-50">{{ event.title }}</td>
            <td class="border p-2 text-center bg-blue-50">{{ event.count }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="font-semibold">
            <td class="border p-2 text-right" colspan="2">Total Events:</td>
            <td class="border p-2 text-center bg-blue-50">
              {{ campusEventsTotal }}
            </td>
          </tr>
        </tfoot>
      </table>

      <!-- No Campus Selected Message -->
      <div v-else class="text-center text-gray-500 py-4">
        Please select a campus to view its events
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useDwdStore } from "../stores/report-cards/dwdClickhouse";

const store = useDwdStore();
const { loading, error, getEventsByName, getCampusEvents } = storeToRefs(store);

// Campus selection
const selectedCampus = ref("");

// Computed property for total events in selected campus
const campusEventsTotal = computed(() => {
  if (!selectedCampus.value || !getCampusEvents.value[selectedCampus.value]) {
    return 0;
  }
  return getCampusEvents.value[selectedCampus.value].events.reduce(
    (sum, event) => sum + event.count,
    0
  );
});

const handleCampusChange = () => {
  console.log("Selected campus:", selectedCampus.value);
};

onMounted(async () => {
  await store.fetchEventData();
});
</script>
