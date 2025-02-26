<template>
    <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div class="flex justify-between items-start mb-6">
            <div>
                <h1 class="text-3xl font-bold text-red-800">REPORT CARD</h1>
                <p class="text-gray-600">MONTH: {{ currentMonth }}</p>
            </div>
            <div class="w-32">
                <img
                    :src="studentData.photo"
                    alt="Student Photo"
                    class="rounded"
                    v-if="studentData.photo"
                />
            </div>
        </div>

        <div class="mb-6">
            <p>
                <span class="font-semibold">Student Name:</span>
                {{
                    `${studentReportData?.studentFirstName} ${studentReportData.studentLastName}`
                }}
            </p>
            <p>
                <span class="font-semibold">Student ID:</span>
                {{ studentReportData?.idCard }}
            </p>
            <p>
                <span class="font-semibold">Class</span>
                {{ studentReportData?.structureRecordName }}
            </p>
            <p>
                <span class="font-semibold">Total Student:</span>
                {{ structureRecordData?.studentDetails.length }} students
            </p>
            <p v-if="structureRecordData?.studentDetails && structureRecordData?.studentDetails.length > 0">
                <span class="font-semibold">Total Female:</span>
                {{ countFemaleStudent }} students
            </p>
        </div>

        <!-- Score Table -->
        <table class="w-full mb-6 border-collapse">
            <thead class="bg-red-800 text-white">
                <tr>
                    <th class="border p-2 text-left">SUBJECT</th>
                    <th class="border p-2">SCORE</th>
                    <th class="border p-2">GRADE</th>
                    <th class="border p-2">RANK</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="subject in subjectByMonth"
                    :key="subject.subjectEvaluationId"
                >
                    <td class="border p-2">{{ subject.subjectName }}</td>
                    <td class="border p-2 text-center">
                        {{ subject.score }}/{{ subject.maxScore }}
                    </td>
                    <td class="border p-2 text-center">{{ subject.grade }}</td>
                    <td class="border p-2 text-center" >{{ subject.rank }}</td>
                </tr>
            </tbody>
        </table>

        <!-- Attendance Table -->
        <table class="w-full mb-6 border-collapse">
            <thead class="bg-red-800 text-white">
                <tr>
                    <th class="border p-2 text-left">ATTENDANCE</th>
                    <th class="border p-2">MARCH</th>
                    <th class="border p-2">TOTAL FROM PREVIOUSE MONTHS</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="border p-2">Present</td>
                    <td class="border p-2 text-center">
                        {{ studentData.attendance.present }}
                    </td>
                    <td class="border p-2 text-center">
                        {{ studentData.attendance.totalPresent }}
                    </td>
                </tr>
                <tr>
                    <td class="border p-2">Absence with Permission</td>
                    <td class="border p-2 text-center">
                        {{ studentData.attendance.absenceWithPermission }}
                    </td>
                    <td class="border p-2 text-center">
                        {{ studentData.attendance.totalAbsenceWithPermission }}
                    </td>
                </tr>
                <tr>
                    <td class="border p-2">Absence without Permission</td>
                    <td class="border p-2 text-center">
                        {{ studentData.attendance.absenceWithoutPermission }}
                    </td>
                    <td class="border p-2 text-center">
                        {{
                            studentData.attendance.totalAbsenceWithoutPermission
                        }}
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Grading Scale -->
        <div class="bg-red-800 text-white p-3 inline-block">
            <p class="font-semibold">GRADING SCALE:</p>
            <div class="text-sm">
                <p>A = 90% - 100%</p>
                <p>B = 80% - 89%</p>
                <p>C = 60% - 79%</p>
                <p>D = 0% - 59%</p>
            </div>
        </div>

        <div class="mt-8 text-right">
            <p class="font-semibold">Van Komphak</p>
            <p class="text-sm">Class Teacher</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useReportCardStore } from "@/stores/report-cards/reportClickhouse";
    import type { StudentReportDataType } from "@/types/studentReport.type";
    import { storeToRefs } from "pinia";
    import { computed, onMounted, ref, toRefs, watchEffect } from "vue";
    import { useRoute } from "vue-router";

    const reportCardStore = useReportCardStore();

    const {fetchStructureRecord} = reportCardStore

    const { structureRecordData, loadingState } = storeToRefs(reportCardStore);

    const props = defineProps<{
        studentData: StudentData;
        studentReportData: StudentReportDataType;
    }>();

    const { studentReportData } = toRefs(props);

    const route = useRoute();

    const monthName = route.params.month as string;

    // Ensure studentReportData is defined before filtering
    const subjectByMonth = computed(() => {
        if (
            !studentReportData.value ||
            !studentReportData.value.subjectDetails
        ) {
            return []; // Return empty array if data isn't available yet
        }
        return studentReportData.value.subjectDetails.filter(
            (subject) => subject.monthName === monthName
        );
    });

    const countFemaleStudent = computed(() => {
    return structureRecordData.value?.studentDetails
        ? structureRecordData.value.studentDetails.filter(student => student.gender === 'female').length
        : 0;
});

    onMounted(() => {
        fetchStructureRecord("20fa080a-2f61-4f82-9cc2-326bdc50ca48");
    });

    watchEffect(() => {
        console.log(subjectByMonth.value);
        console.log(structureRecordData.value);
        console.log("count female", countFemaleStudent.value);
    });

    interface Score {
        subject: string;
        maxScore: number;
        score: number;
        grade: string;
    }

    interface Attendance {
        present: number;
        totalPresent: number;
        absenceWithPermission: number;
        totalAbsenceWithPermission: number;
        absenceWithoutPermission: number;
        totalAbsenceWithoutPermission: number;
    }

    interface StudentData {
        name: string;
        id: string;
        level: string;
        totalStudents: number;
        totalFemale: number;
        photo?: string;
        scores: Score[];
        attendance: Attendance;
    }

    const currentMonth = ref(
        new Date().toLocaleString("default", { month: "long" })
    );
</script>

<style scoped>
    .border {
        @apply border-gray-300;
    }
</style>
