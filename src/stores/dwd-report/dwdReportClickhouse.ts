import { defineStore } from "pinia";
import { ref } from "vue";
import clickhouseApi from "../../api/clickhouseAxios";
import type { DwdReportDataType } from "@/types/DwdReport.type";


const DWD_REPORT_TABLE = "clickhouse.dwd_report";


export const useDwdReportStore = defineStore("dwdReport", () => {
    const dwdReportData = ref<DwdReportDataType[] | null>(null);

    const loadingState = ref<{ dwdReport: boolean }>({
        dwdReport: false,
    });

    const errorState = ref<{ dwdReport: string | null }>({
        dwdReport: null
    });

    function setState(newState: Partial<{
        dwdReportData: DwdReportDataType[] | null;
        loadingState: Partial<typeof loadingState.value>;
        errorState: Partial<typeof errorState.value>;
    }>) {
        if (newState.dwdReportData !== undefined) dwdReportData.value = newState.dwdReportData;
        if (newState.loadingState !== undefined) loadingState.value = { ...loadingState.value, ...newState.loadingState };
        if (newState.errorState !== undefined) errorState.value = { ...errorState.value, ...newState.errorState };
    }

    async function executeQuery(query: string, type: "dwdReport") {

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

    async function fetchDwdReport() {
        const query = `SELECT * FROM ${DWD_REPORT_TABLE} `

        const data = await executeQuery(query, "dwdReport");

        setState({ dwdReportData: data });
    }

    return {
        dwdReportData,
        loadingState,
        errorState,
        fetchDwdReport,
        setState,
    };
});