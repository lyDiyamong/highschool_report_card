import { defineStore } from "pinia";
import { ref } from "vue";
import clickhouseApi from "../../api/clickhouseAxios";

interface GenderDetails {
  male: string;
  female: string;
  other: string;
  total: string;
}

interface SurveyDataType {
  surveyQuestionId: string;
  surveyName: string;
  studentDetails: GenderDetails;
  professionalDetails: GenderDetails;
  otherDetails: GenderDetails;
  updatedAt: string;
}

const DWD_SURVEY_TABLE = "clickhouse.dwd_survey";

export const useDwdSurveyStore = defineStore("dwdSurvey", () => {
  const dwdSurveyData = ref<SurveyDataType[] | null>(null);
  const loadingState = ref<{ dwdSurvey: boolean }>({
    dwdSurvey: false,
  });
  const errorState = ref<{ dwdSurvey: string | null }>({
    dwdSurvey: null,
  });

  function setState(
    newState: Partial<{
      dwdSurveyData: SurveyDataType[] | null;
      loadingState: Partial<typeof loadingState.value>;
      errorState: Partial<typeof errorState.value>;
    }>
  ) {
    if (newState.dwdSurveyData !== undefined)
      dwdSurveyData.value = newState.dwdSurveyData;
    if (newState.loadingState !== undefined)
      loadingState.value = { ...loadingState.value, ...newState.loadingState };
    if (newState.errorState !== undefined)
      errorState.value = { ...errorState.value, ...newState.errorState };
  }

  async function executeQuery(query: string, type: "dwdSurvey") {
    try {
      const response = await clickhouseApi.get("/", { params: { query } });
      console.log("Survey Data from Clickhouse:", {
        totalRecords: response.data.length,
        data: response.data,
      });
      return response.data;
    } catch (err: any) {
      setState({
        errorState: {
          [type]: err.message || "An error occurred while executing the query",
        },
      });
      console.error("Query error:", err);
      return null;
    } finally {
      setState({ loadingState: { [type]: false } });
    }
  }

  async function fetchDwdSurvey() {
    const query = `SELECT * FROM ${DWD_SURVEY_TABLE} FORMAT JSON`;
    const data = await executeQuery(query, "dwdSurvey");

    if (data) {
      // Sort the data to put 'Others' at the bottom
      const sortedData = [...data].sort((a, b) => {
        if (a.surveyName === "Others") return 1;
        if (b.surveyName === "Others") return -1;
        return a.surveyName.localeCompare(b.surveyName);
      });

      setState({ dwdSurveyData: sortedData });
    } else {
      setState({ dwdSurveyData: null });
    }
  }

  return {
    dwdSurveyData,
    loadingState,
    errorState,
    fetchDwdSurvey,
    setState,
  };
});
