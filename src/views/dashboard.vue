<template>
    <dashboard-stats :stats="dashboardStats" />
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import DashboardStats from "../components/DashboardStats.vue";

    const dashboardStats = ref({
        totalStudents: 40,
        averageAttendance: 95,
        topPerformers: 10,
        needsImprovement: 5,
    });
</script>
