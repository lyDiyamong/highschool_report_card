import { defineStore } from "pinia";
import { ref, computed } from "vue";
import clickhouseApi from "../../api/clickhouseAxios";

interface GenderDetails {
  male: string;
  female: string;
  other: string;
  total: string;
}

interface CampusEventCount {
  campusName: string;
  campusId: string;
  eventCount: string;
}

interface EventData {
  schoolId: string;
  schoolName: string;
  eventName: string;
  studentDetails: GenderDetails;
  professionalDetails: GenderDetails;
  otherDetails: GenderDetails;
  eventCountDetails: CampusEventCount[];
  updatedAt: string;
}

const DWD_REPORT_TABLE = "clickhouse.dwd_report_v4";

export const useDwdStore = defineStore("dwd", () => {
  const eventData = ref<EventData[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Get total events by event name
  const getEventsByName = computed(() => {
    return eventData.value
      .map((event) => ({
        title: event.eventName,
        count: event.eventCountDetails.reduce(
          (sum, detail) => sum + parseInt(detail.eventCount),
          0
        ),
      }))
      .sort((a, b) => {
        // Put "Others" at the bottom
        if (a.title === "Others") return 1;
        if (b.title === "Others") return -1;
        // Sort other items alphabetically
        return a.title.localeCompare(b.title);
      });
  });

  // Get all campuses with their events
  const getCampusEvents = computed(() => {
    const campusMap = new Map<
      string,
      { name: string; events: { title: string; count: number }[] }
    >();

    // First, initialize all campuses with empty events arrays
    eventData.value.forEach((event) => {
      event.eventCountDetails.forEach((campus) => {
        if (!campusMap.has(campus.campusId)) {
          campusMap.set(campus.campusId, {
            name: campus.campusName,
            events: [],
          });
        }
      });
    });

    // Then, add all events for each campus, including zeros
    eventData.value.forEach((event) => {
      event.eventCountDetails.forEach((campus) => {
        const campusData = campusMap.get(campus.campusId)!;
        campusData.events.push({
          title: event.eventName,
          count: parseInt(campus.eventCount),
        });
      });
    });

    // Sort events for each campus, putting "Others" at the bottom
    campusMap.forEach((campus) => {
      campus.events.sort((a, b) => {
        if (a.title === "Others") return 1;
        if (b.title === "Others") return -1;
        return a.title.localeCompare(b.title);
      });
    });

    return Object.fromEntries(
      Array.from(campusMap.entries()).map(([id, data]) => [id, data])
    );
  });

  const fetchEventData = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await clickhouseApi.get("/", {
        params: {
          query: `SELECT * FROM ${DWD_REPORT_TABLE} FORMAT JSON`,
        },
      });

      eventData.value = response.data;
      console.log("Event Data from Clickhouse:", {
        totalRecords: response.data.length,
        data: response.data,
      });
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
    getEventsByName,
    getCampusEvents,
    fetchEventData,
  };
});
