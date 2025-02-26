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
const { data, loading, error } = storeToRefs(reportCard); // ✅ Keep reactivity
const { studentReport } = reportCard; // ✅ This can be destructured normally (it's a function)

async function fetchData() {
    try {
        await studentReport({
            studentId: "378a96da-8fe2-4745-a99c-d92c3f1b54a8",
            structureRecordId: "8a8a6590-f543-47cd-9f1c-783fc62b9d8d",
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
