<template>
    <h2 v-if="loadingState.studentReport">Loading...</h2>
    <report-card
        v-else-if="studentReportData"
        :studentData="studentData"
        :studentReportData="studentReportData"
    />
    <h2 v-else>No data available</h2>
</template>

<script setup lang="ts">
    import { onMounted, ref, watchEffect } from "vue";
    import { storeToRefs } from "pinia"; 
    import ReportCard from "../components/ReportCard.vue";
    import { useReportCardStore } from "../stores/report-cards/reportClickhouse";
import { useRoute } from "vue-router";

    const reportCard = useReportCardStore();
    // Keep reactivity
    const { studentReportData, loadingState } = storeToRefs(reportCard);
    // This can be destructured normally (it's a function)
    const { fetchStudentReport } = reportCard;

    const route = useRoute()

    const studentId= String(route.query.studentId ?? "");

    async function fetchData() {
        try {
            await fetchStudentReport({
                studentId,
                structureRecordId: "20fa080a-2f61-4f82-9cc2-326bdc50ca48",
            });
        } catch (err) {
            console.error("Query failed:", err);
        }
    }

    onMounted(() => {
        fetchData();
    });

    // ✅ Now this will correctly react when `data` updates
    watchEffect(() => {
        console.log("Updated data:", studentReportData.value);
    });

    // ✅ Ensure `studentData` is also a reactive `ref`
    const studentData = ref({
        name: "",
        id: "",
        level: "EYC Level",
        totalStudents: 40,
        totalFemale: 15,
        scores: [
            { subject: "Writing Test", maxScore: 50, score: 49.5, grade: "A" },
            { subject: "Dictation", maxScore: 50, score: 50, grade: "A" },
            {
                subject: "Literacy Planet",
                maxScore: 100,
                score: 100,
                grade: "A",
            },
            { subject: "Attendance", maxScore: 100, score: 100, grade: "A" },
        ],
        attendance: {
            present: 19,
            absenceWithPermission: 2,
            absenceWithoutPermission: 1,
            totalPresent: 40,
            totalAbsenceWithPermission: 10,
            totalAbsenceWithoutPermission: 5,
        },
    });
</script>
