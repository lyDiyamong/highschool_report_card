<template>
    <h2 v-if="loading">Loading...</h2>
    <h2 v-else-if="data && data.studentLastName">{{ data?.studentLastName }}</h2>
    <h2 v-else>No data available</h2>

    <report-card :studentData="studentData" :anotherStudentData="data" />
</template>

<script setup lang="ts">
    import { onMounted, ref, watchEffect } from "vue";
import { storeToRefs } from "pinia"; // ✅ Import storeToRefs
import ReportCard from "../components/ReportCard.vue";
import { useReportCardStore } from "../stores/report-cards/reportClickhouse";

const reportCard = useReportCardStore();
// ✅ Keep reactivity
const { data, loading, error } = storeToRefs(reportCard); 
// ✅ This can be destructured normally (it's a function)
const { studentReport } = reportCard; 

async function fetchData() {
    try {
        await studentReport({
            studentId: "0480eb62-4710-4343-851e-19718f2f3e93",
            structureRecordId: "137c3bf7-34f4-4998-a988-2ed26a4734b2",
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
    console.log("Updated data:", data.value);
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
