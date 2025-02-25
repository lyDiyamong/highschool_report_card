<template>
    <h2 v-if="loading">Loading...</h2>
    <h2 v-else-if="data && data.studentLastName">{{ data?.studentLastName }}</h2>
    <h2 v-else>No data available</h2>

    <report-card :studentData="studentData" :anotherStudentData="data" />
</template>

<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import ReportCard from "../components/ReportCard.vue";
    import { useReportCardStore } from "../stores/report-cards/reportClickhouse";
    import { watchEffect } from "vue";

    const reportCard = useReportCardStore();

    const { data, loading, error, studentReport } = reportCard;

    async function fetchData() {
        try {
            await studentReport({
                studentId: "69d62915-02da-4830-a4ab-d9abc1c5db81",
                structureRecordId: "fa89399f-1958-48f1-85c2-6eca66977ead",
            });
        } catch (err) {
            console.error("Query failed:", err);
        }
    }

    onMounted(() => {
        fetchData();
    });
    watchEffect(() => {
        console.log("Updated data:", data);
    });

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
