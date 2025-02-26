<template>
    <a-table
        :columns="columns"
        :data-source="structuredData"
        :loading="loading"
    >
        <template #headerCell="{ column }">
            <template v-if="column.key === 'name'">
                <span class="flex items-center gap-2">
                    <smile-outlined /> Name
                </span>
            </template>
        </template>

        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
                <a class="text-blue-500 hover:underline">
                    {{ record.fullName }}
                </a>
            </template>
            <template v-else-if="column.key === 'idCard'">
                <span>{{ record.idCard }}</span>
            </template>
            <template v-else-if="column.key === 'month'">
                <a-select
                    v-model:value="record.selectedMonth"
                    class="w-full"
                    @change="handleNavigateMonth(record.selectedMonth)"
                >
                    <a-select-option
                        v-for="month in uniqueMonths"
                        :key="month"
                        :value="month"
                    >
                        {{ month }}
                    </a-select-option>
                </a-select>
            </template>
        </template>
    </a-table>
</template>

<script lang="ts" setup>
    import { SmileOutlined } from "@ant-design/icons-vue";
    import { computed, onMounted, toRefs } from "vue";
    import { useRouter } from "vue-router";
import type { StructureDataType } from "@/types/studentReport.type";

    const props = defineProps<{
        structureRecordData: StructureDataType;
        loading : boolean
    }>();
    const { structureRecordData, loading } = toRefs(props);


    const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "ID Card", dataIndex: "idCard", key: "idCard" },
        { title: "Month", dataIndex: "month", key: "month" },
        { title: "Action", key: "action" },
    ];

    const structuredData = computed(() => {
        if (structureRecordData.value)
            return structureRecordData.value.studentDetails.map((record) => ({
                key: record.idCard,
                fullName: `${record.studentFirstName} ${record.studentLastName}`,
                idCard: record.idCard,
                selectedMonth: null,
            }));
    });

    const uniqueMonths = computed(() => {
        const monthsSet = new Set();
        if (structureRecordData.value) {
            structureRecordData.value.studentDetails.forEach((record) => {
                record.subjectDetails.forEach((subject) => {
                    monthsSet.add(subject.monthName);
                });
            });
        }
        return [...monthsSet];
    });
    const router = useRouter();

    const handleNavigateMonth = (monthName: string) => {
        router.push(`/reports/${monthName}`);
    };

</script>

<style scoped>
    :deep(.ant-table-thead th) {
        @apply bg-gray-100 text-gray-800;
    }
</style>
