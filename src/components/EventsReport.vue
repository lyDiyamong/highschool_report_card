<template>
    <div class="events-report">
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-4">Loading...</div>

        <!-- Error State -->
        <div v-else-if="error" class="text-red-600 text-center py-4">
            {{ error }}
        </div>

        <!-- Data Display -->
        <div v-else class="bg-white p-6 rounded-lg shadow overflow-x-auto">
            <div class="text-lg font-semibold mb-4">Reporting Period</div>
            <table class="w-full border-collapse my-4">
                <tbody>
                    <tr>
                        <td class="border p-2 bg-blue-50">
                            CC Location (branch)
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Events Table -->
            <table class="w-full border-collapse mt-6">
                <thead>
                    <tr>
                        <th class="border p-2">No</th>
                        <th class="border p-2 bg-blue-50">
                            Event(s) conducted
                        </th>
                        <th class="border p-2 bg-blue-50">Count</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(stat, index) in eventData" :key="index">
                        <td class="border p-2 text-center">{{ index + 1 }}</td>
                        <td class="border p-2 bg-blue-50">{{ stat.title }}</td>
                        <td class="border p-2 text-center bg-blue-50">
                            {{ stat.count }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted } from "vue";
    import { storeToRefs } from "pinia";
    import { useDwdStore } from "../stores/report-cards/dwdClickhouse";

    const store = useDwdStore();
    const { eventData, loading, error } = storeToRefs(store);

    onMounted(async () => {
        await store.fetchEventData();
    });
</script>
