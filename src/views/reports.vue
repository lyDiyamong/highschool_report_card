<template>
    <h1 v-if="loading">Loading...</h1>
    <!-- <h2 v-else-if="data && data.studentLastName">{{ data?.studentLastName }}</h2> -->
    <MonthList v-if="structureRecordData" :structureRecordData="structureRecordData" :loading="loading" />
    <!-- <h2 v-else>No data available</h2> -->
</template>

<script setup lang="ts">

    import MonthList  from "@/components/MonthList.vue";
    import { useReportCardStore } from "@/stores/report-cards/reportClickhouse";
    import { storeToRefs } from "pinia";
    import { onMounted } from "vue";
    const reportCardStore = useReportCardStore();
    const { structureRecordData, loading } = storeToRefs(reportCardStore);
    const { fetchStructureRecord } = reportCardStore;


    onMounted(() => {
        fetchStructureRecord("20fa080a-2f61-4f82-9cc2-326bdc50ca48");
    });

</script>
