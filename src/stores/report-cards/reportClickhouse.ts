import { defineStore } from "pinia";
import { ref } from "vue";
import clickhouseApi from "../../api/clickhouseAxios";
import type { StudentReportDataType } from "@/types/studentReport.type";

const STUDENT_SUBJECT_SCORE_TABLE = "clickhouse.student_transcript_staging";

interface StudentDataIdParam {
    studentId: string;
    structureRecordId: string;
}
interface StructureDataType {
    structureRecordId: string
    structureRecordName : string
    studentDetails : StudentReportDataType[]
}

export const useReportCardStore = defineStore("clickhouse", () => {
    const studentReportData = ref<StudentReportDataType | null>(null); // ✅ Ensure reactivity
    const structureRecordData = ref<StructureDataType | null>(null)
    const loading = ref(false);
    const error = ref<string | null>(null);

    async function fetchStudentReport(requireId: StudentDataIdParam) {
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

      console.log("API Response:", response.data);

            if (response.data && response.data.length > 0) {
                studentReportData.value = response.data[0]; // ✅ Assign first row
            } else {
                studentReportData.value = null; // ✅ Reset if no data found
            }
        } catch (err: any) {
            error.value =
                err.message || "An error occurred while executing the query";
            console.error("Query error:", err);
        } finally {
            loading.value = false;
        }
    }

    async function fetchStructureRecord(structureRecordId: string) {
        loading.value = true;
        error.value = null;

        try {
            const response = await clickhouseApi.get("/", {
                params: {
                    query: `SELECT * FROM ${STUDENT_SUBJECT_SCORE_TABLE} 
                        WHERE "structureRecordId" = '${structureRecordId}'`,
                },
            });

            console.log("API Response:", response.data);

            if (response.data && response.data.length > 0) {
                structureRecordData.value = {
                    structureRecordId : response.data[0].structureRecordId,
                    structureRecordName : response.data[0].structureRecordName,
                    studentDetails : response.data
                }; // ✅ Assign first row
            } else {
                structureRecordData.value = null; // ✅ Reset if no data found
            }
        } catch (err: any) {
            error.value =
                err.message || "An error occurred while executing the query";
            console.error("Query error:", err);
        } finally {
            loading.value = false;
        }
    }

    return {
        studentReportData,
        structureRecordData,
        loading,
        error,
        fetchStudentReport,
        fetchStructureRecord
    };
});
