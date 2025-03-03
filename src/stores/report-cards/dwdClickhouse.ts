import { defineStore } from "pinia";
import { ref } from "vue";
import clickhouseApi from "../../api/clickhouseAxios";

interface EventStat {
  title: string;
  count: number;
}

const DWD_REPORT_TABLE = "clickhouse.dwd_report";

export const useDwdStore = defineStore("dwd", () => {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const eventData = ref<EventStat[]>([]);

  const fetchEventData = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await clickhouseApi.get("/", {
        params: {
          query: `SELECT * FROM ${DWD_REPORT_TABLE} FORMAT JSON`,
        },
      });

      console.log("Raw API Response:", response.data);

      // Process the data to aggregate event counts
      const eventCounts = response.data.reduce(
        (acc: Record<string, number>, curr: any) => {
          if (!acc[curr.eventName]) {
            acc[curr.eventName] = 0;
          }
          acc[curr.eventName] += parseInt(curr.eventCount);
          return acc;
        },
        {}
      );

      console.log("Event Counts:", eventCounts);

      eventData.value = Object.entries(eventCounts).map(
        ([eventName, count]): EventStat => ({
          title: eventName,
          count: count as number,
        })
      );

      console.log("Final Data:", eventData.value);
    } catch (err: any) {
      error.value = err.message || "Failed to fetch event data";
      console.error("Error fetching event data:", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    eventData,
    loading,
    error,
    fetchEventData,
  };
});
