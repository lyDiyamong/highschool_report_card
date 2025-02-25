// src/stores/clickhouse.js
import { defineStore } from "pinia";
import { ref } from "vue";
import clickhouseApi from "../../api/clickhouseAxios";

export interface StudentReportData {
    studentId: string;
    structureRecordId: string;
    campusId: string;
    studentFirstName: string;
    studentLastName: string;
    studentFirstNameNative: string;
    studentLastNameNative: string;
}

const STUDENT_SUBJECT_SCORE_TABLE = "clickhouse.student_transcript";
interface RequiredIdParam {
    studentId: string;
    structureRecordId: string;
}
export const useReportCardStore = defineStore("clickhouse", () => {
    const data = ref<StudentReportData | null>(null);
    const loading = ref(false);
    const error = ref(null);

    async function studentReport(requireId: RequiredIdParam) {
        loading.value = true;
        error.value = null;

        try {
            const response = await clickhouseApi.get("/", {
                params: {
                    query: `SELECT * FROM ${STUDENT_SUBJECT_SCORE_TABLE} 
                        WHERE studentId = '${requireId.studentId}' 
                          AND structureRecordId = '${requireId.structureRecordId}'
                        LIMIT 1`,
                },
            });

            console.log("API Response:", response.data[0]);

            if (response.data && response.data.length > 0) {
                data.value = response.data[0]; // Assign the first row
            } else {
                data.value = null;
            }
        } catch (err: any) {
            error.value =
                err.message || "An error occurred while executing the query";
            console.error("Query error:", err);
            throw err;
        } finally {
            loading.value = false;
        }
    }

    return {
        data,
        loading,
        error,
        studentReport,
    };
});
