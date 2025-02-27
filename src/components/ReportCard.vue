<template>
    <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div class="flex justify-between items-start mb-6">
            <div>
                <h1 class="text-3xl font-bold text-red-800">REPORT CARD</h1>
                <p class="text-gray-600">MONTH: {{ month }}</p>
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
            <p
                v-if="
                    structureRecordData?.studentDetails &&
                    structureRecordData?.studentDetails.length > 0
                "
            >
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
                    <td class="border p-2 text-center">{{ subject.rank }}</td>
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
        <table class=" border-collapse bg-red-800 text-white p-3 ">
            <thead>
                <tr>
                    <th class=" p-2  text-center">
                        Grade
                    </th>
                    <th class=" p-2  text-left">
                        Mark
                    </th>
                    
                </tr>
            </thead>
            <tbody>
                <tr v-for="grade in gradeScale" :key="grade.mark">
                    <td class="border border-gray-300 p-2 text-center">
                        {{ grade.grade }}
                    </td>
                    <td class="border border-gray-300 p-2">{{ grade.mark }}</td>
                    
                </tr>
            </tbody>
        </table>

        <!-- <div class="mt-8 text-right">
            <p class="font-semibold">Van Komphak</p>
            <p class="text-sm">Class Teacher</p>
        </div> -->
    </div>
</template>

<script setup lang="ts">
    import { useReportCardStore } from "@/stores/report-cards/reportClickhouse";
    import type { StudentReportDataType } from "@/types/studentReport.type";
    import { storeToRefs } from "pinia";
    import { computed, onMounted, ref, toRefs, watchEffect } from "vue";
    import { useRoute } from "vue-router";

    const reportCardStore = useReportCardStore();

    const { fetchStructureRecord } = reportCardStore;

    const { structureRecordData, loadingState } = storeToRefs(reportCardStore);

    const props = defineProps<{
        studentData: StudentData;
        studentReportData: StudentReportDataType;
    }>();

    const { studentReportData } = toRefs(props);

    const route = useRoute();

    const month = route.query.month ?? "";
    const studentId = route.query.studentId ?? "";

    const subjectByMonth = computed(() => {
        if (!studentReportData.value?.subjectDetails) {
            return []; // Return empty array if data isn't available
        }

        const studentExists = structureRecordData.value?.studentDetails?.some(
            (student) => student.studentId === studentId
        );

        return studentExists
            ? studentReportData.value.subjectDetails.filter(
                  (subject) => subject.monthName === month
              )
            : [];
    });

    const countFemaleStudent = computed(() => {
        return structureRecordData.value?.studentDetails
            ? structureRecordData.value.studentDetails.filter(
                  (student) => student.gender === "female"
              ).length
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

    const gradeScale = ref([
        { mark: "85%-100%", grade: "A"},
        { mark: "80%-84%", grade: "B+", },
        { mark: "70%-79%", grade: "B", },
        { mark: "65%-69%", grade: "C+" },
        { mark: "50%-64%", grade: "C",},
        { mark: "45%-49%", grade: "D" },
        { mark: "40%-44%", grade: "E" },
        { mark: "<40%", grade: "F" },
    ]);
</script>

<style scoped>
    .border {
        @apply border-gray-300;
    }
</style>
