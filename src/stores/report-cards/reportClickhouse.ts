import { defineStore } from "pinia";
import { ref } from "vue";
import clickhouseApi from "../../api/clickhouseAxios";
import type { StudentReportDataType } from "@/types/studentReport.type";


const STUDENT_SUBJECT_SCORE_TABLE = "clickhouse.student_transcript_staging";

interface RequiredIdParam {
  studentId: string;
  structureRecordId: string;
}

export const useReportCardStore = defineStore("clickhouse", () => {
    const data = ref<StudentReportDataType | null>(null); // ✅ Ensure reactivity
    const loading = ref(false);
    const error = ref<string | null>(null);

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

      console.log("API Response:", response.data);

      if (response.data && response.data.length > 0) {
        data.value = response.data[0]; // ✅ Assign first row
      } else {
        data.value = null; // ✅ Reset if no data found
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
    data,
    loading,
    error,
    studentReport,
  };
});
