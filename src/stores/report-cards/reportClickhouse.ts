import { defineStore } from "pinia";
import { ref } from "vue";
import clickhouseApi from "../../api/clickhouseAxios";
import type { StructureDataType, StudentReportDataType } from "@/types/studentReport.type";

const STUDENT_SUBJECT_SCORE_TABLE = "clickhouse.student_transcript_staging";

interface StudentDataIdParam {
    studentId: string;
    structureRecordId: string;
}

export const useReportCardStore = defineStore("clickhouse", () => {
    const studentReportData = ref<StudentReportDataType | null>(null);
    const structureRecordData = ref<StructureDataType | null>(null);

    const loadingState = ref<{ studentReport: boolean; structureRecord: boolean }>({
        studentReport: false,
        structureRecord: false,
    });

    const errorState = ref<{ studentReport: string | null; structureRecord: string | null }>({
        studentReport: null,
        structureRecord: null,
    });

    function setState(newState: Partial<{
        studentReportData: StudentReportDataType | null;
        structureRecordData: StructureDataType | null;
        loadingState: Partial<typeof loadingState.value>;
        errorState: Partial<typeof errorState.value>;
    }>) {
        if (newState.studentReportData !== undefined) studentReportData.value = newState.studentReportData;
        if (newState.structureRecordData !== undefined) structureRecordData.value = newState.structureRecordData;
        if (newState.loadingState !== undefined) loadingState.value = { ...loadingState.value, ...newState.loadingState };
        if (newState.errorState !== undefined) errorState.value = { ...errorState.value, ...newState.errorState };
    }

    async function executeQuery(query: string, type: "studentReport" | "structureRecord") {
        setState({ loadingState: { [type]: true }, errorState: { [type]: null } });

        try {
            const response = await clickhouseApi.get("/", { params: { query } });

            console.log("API Response:", response.data);
            return response.data;
        } catch (err: any) {
            setState({ errorState: { [type]: err.message || "An error occurred while executing the query" } });
            console.error("Query error:", err);
            return null;
        } finally {
            setState({ loadingState: { [type]: false } });
        }
    }

    async function fetchStudentReport(requireId: StudentDataIdParam) {
        const query = `SELECT * FROM ${STUDENT_SUBJECT_SCORE_TABLE} 
                        WHERE studentId = '${requireId.studentId}' 
                          AND structureRecordId = '${requireId.structureRecordId}'
                        LIMIT 1`;

        const data = await executeQuery(query, "studentReport");

        setState({ studentReportData: data?.length ? data[0] : null });
    }

    async function fetchStructureRecord(structureRecordId: string) {
        const query = `SELECT * FROM ${STUDENT_SUBJECT_SCORE_TABLE} 
                        WHERE structureRecordId = '${structureRecordId}'`;

        const data = await executeQuery(query, "structureRecord");

        if (data?.length) {
            setState({
                structureRecordData: {
                    structureRecordId: data[0].structureRecordId,
                    structureRecordName: data[0].structureRecordName,
                    studentDetails: data,
                },
            });
        } else {
            setState({ structureRecordData: null });
        }
    }

    return {
        studentReportData,
        structureRecordData,
        loadingState,
        errorState,
        fetchStudentReport,
        fetchStructureRecord,
        setState, // Exposed for global state updates if needed
    };
});
