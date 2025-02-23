<template>
    <router-view></router-view>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import {
        DashboardOutlined,
        FileTextOutlined,
        UserOutlined,
    } from "@ant-design/icons-vue";
    import ReportCard from "./components/ReportCard.vue";
    import DashboardStats from "./components/DashboardStats.vue";

    const selectedKeys = ref(["dashboard"]);

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

    const dashboardStats = ref({
        totalStudents: 40,
        averageAttendance: 95,
        topPerformers: 10,
        needsImprovement: 5,
    });
</script>
