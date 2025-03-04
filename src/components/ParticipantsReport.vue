<template>
    <div class="participants-report">
        <!-- Table Section -->
        <div class="bg-white p-6 rounded-lg shadow overflow-x-auto">
            <div class="text-lg font-semibold mb-4">Reporting Period</div>
            <h1 v-if="loadingState.dwdReport">Loading ...</h1>
            <table v-else class="w-full border-collapse mt-6">
                <thead>
                    <tr>
                        <th class="border p-2" rowspan="2">No</th>
                        <th class="border p-2 bg-blue-50" rowspan="2">
                            Description
                        </th>
                        <th class="border p-2" colspan="4">Student</th>
                        <th class="border p-2" colspan="4">
                            Professional Worker
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
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(stat, index) in dwdReportData" :key="index">
                        <td class="border p-2 text-center">{{ index + 1 }}</td>
                        <td class="border p-2 bg-blue-50">
                            Participant(s) attended in
                            <span class="font-semibold">{{
                                stat.eventName
                            }}</span>
                        </td>
                        <td class="border p-2 text-center">
                            {{ stat.studentDetails?.male ?? 0 }}
                        </td>
                        <td class="border p-2 text-center">
                            {{ stat.studentDetails?.female ?? 0 }}
                        </td>
                        <td class="border p-2 text-center">
                            {{ stat.studentDetails?.other ?? 0 }}
                        </td>
                        <td class="border p-2 text-center bg-blue-50">
                            {{ stat.studentDetails?.total ?? 0 }}
                        </td>
                        <td class="border p-2 text-center">
                            {{ stat.professionalDetails?.male ?? 0 }}
                        </td>
                        <td class="border p-2 text-center">
                            {{ stat.professionalDetails?.female ?? 0 }}
                        </td>
                        <td class="border p-2 text-center">
                            {{ stat.professionalDetails?.other ?? 0 }}
                        </td>
                        <td class="border p-2 text-center bg-blue-50">
                            {{ stat.professionalDetails?.total ?? 0 }}
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td
                            colspan="2"
                            class="border p-2 text-right font-semibold"
                        >
                            Total Participants:
                        </td>
                        <td class="border p-2 text-center">
                            {{ totalParticipants }}
                        </td>
                        <td colspan="6" class="border p-2 text-center"></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useDwdReportStore } from "@/stores/dwd-report/dwdReportClickhouse";
    import { storeToRefs } from "pinia";
    import { onMounted, watchEffect, computed } from "vue";

    const dwdReportStore = useDwdReportStore();
    const { dwdReportData, loadingState } = storeToRefs(dwdReportStore);
    const { fetchDwdReport } = dwdReportStore;

    onMounted(() => {
        fetchDwdReport();
    });

    watchEffect(() => {
        console.log("Dwd data:", dwdReportData.value);
    });

    // Computed property to sum total participants
    const totalParticipants = computed(() => {
        return (
            dwdReportData.value?.reduce((acc, stat) => {
                return (
                    acc +
                    Number(stat.studentDetails?.total || 0) +
                    Number(stat.professionalDetails?.total || 0) + 
                    Number(stat.otherDetails?.total || 0)
                );
            }, 0) || 0
        );
    });
</script>
