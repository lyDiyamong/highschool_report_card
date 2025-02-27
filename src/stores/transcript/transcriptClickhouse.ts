import { defineStore } from "pinia";
import { ref } from "vue";
import clickhouseApi from "../../api/clickhouseAxios";

// Separate interfaces for different data types
export interface StudentData {
  studentId: string;
  studentFirstName: string;
  studentLastName: string;
  studentFirstNameNative: string;
  studentLastNameNative: string;
  idCard: string;
  dob: string;
  gender: string;
}

export interface StructureData {
  schoolId: string;
  campusId: string;
  structureRecordId: string;
  structureRecordName: string;
  groupStructureId: string;
  structurePath: string;
}
interface SubjectDetailType {
  code: string;
  credit: number;
  gpa: number;
  grade: string;
  maxScore: number;
  meaning: string;
  monthEvaluationId: string | null;
  monthName: string;
  percentage: number;
  score: number;
  semesterEvaluationId: string;
  semesterName: string;
  subjectEvaluationId: string;
  subjectName: string;
  subjectNameNative: string;
  subjectParentEvaluationId: string;
  subjectParentName: string;
  subjectParentType: string;
}


// Add interface for yearly academic data
export interface YearlyData {
  year: number;
  subjectDetails: SubjectDetailType[];
  totalCredits: number;
  totalGPA: number;
  subjectCount: number;
  scorerId: string;
  markedAt: string;
  createdAt: string;
}

// Add interface for school info
export interface SchoolInfo {
  name: string;
  logo: string;
  address: string;
}

const STUDENT_TRANSCRIPT_TABLE = "clickhouse.student_transcript_staging";

interface RequiredTranscriptParam {
  idCard: string;
  groupStructureId: string;
}

export const useTranscriptStore = defineStore("transcript", () => {
  // Separate refs for different data types
  const studentData = ref<StudentData | null>(null);
  const structureData = ref<StructureData | null>(null);
  const yearOne = ref<YearlyData | null>(null);
  const yearTwo = ref<YearlyData | null>(null);
  const yearThree = ref<YearlyData | null>(null);
  const yearFour = ref<YearlyData | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  // Add school info ref
  const schoolInfo = ref<SchoolInfo | null>(null);

  async function fetchTranscript(params: RequiredTranscriptParam) {
    loading.value = true;
    error.value = null;

    try {
      // Fetch school info
      const schoolResponse = await clickhouseApi.get("/", {
        params: {
          query:
            "SELECT name, logo, address FROM clickhouse.school_staging WHERE schoolId= '6038e409-72a6-47bf-a002-4e1e1c5b2441' FORMAT JSON",
        },
      });

      if (schoolResponse.data && schoolResponse.data[0]) {
        schoolInfo.value = {
          name: schoolResponse.data[0].name,
          logo: schoolResponse.data[0].logo,
          address: schoolResponse.data[0].address,
        };
      }

      const response = await clickhouseApi.get("/", {
        params: {
          query: `SELECT * FROM ${STUDENT_TRANSCRIPT_TABLE} WHERE idCard = '${params.idCard}' AND groupStructureId = '${params.groupStructureId}' ORDER BY structureRecordName ASC FORMAT JSON`,
        },
      });

      console.log("Transcript API Response:", response.data);
      console.log("School Info:", schoolInfo.value);

      if (response.data && response.data.length > 0) {
        // Set student and structure data from first record
        const firstRecord = response.data[0];
        studentData.value = {
          studentId: firstRecord.studentId,
          studentFirstName: firstRecord.studentFirstName,
          studentLastName: firstRecord.studentLastName,
          studentFirstNameNative: firstRecord.studentFirstNameNative,
          studentLastNameNative: firstRecord.studentLastNameNative,
          idCard: firstRecord.idCard,
          dob: firstRecord.dob,
          gender: firstRecord.gender,
        };

        structureData.value = {
          schoolId: firstRecord.schoolId,
          campusId: firstRecord.campusId,
          structureRecordId: firstRecord.structureRecordId,
          structureRecordName: firstRecord.structureRecordName,
          groupStructureId: firstRecord.groupStructureId,
          structurePath: firstRecord.structurePath,
        };

        // Organize academic data by year
        yearOne.value = response.data[1]
          ? {
              year: response.data[1].structureRecordName,
              subjectDetails: response.data[1].subjectDetails,
              totalCredits: response.data[1].totalCredits,
              totalGPA: response.data[1].totalGPA,
              subjectCount: response.data[1].subjectCount,
              scorerId: response.data[1].scorerId,
              markedAt: response.data[1].markedAt,
              createdAt: response.data[1].createdAt,
            }
          : null;

        yearTwo.value = response.data[0]
          ? {
              year: response.data[0].structureRecordName,
              subjectDetails: response.data[0].subjectDetails,
              totalCredits: response.data[0].totalCredits,
              totalGPA: response.data[0].totalGPA,
              subjectCount: response.data[0].subjectCount,
              scorerId: response.data[0].scorerId,
              markedAt: response.data[0].markedAt,
              createdAt: response.data[0].createdAt,
            }
          : null;

        yearThree.value = response.data[2]
          ? {
              year: response.data[2].structureRecordName,
              subjectDetails: response.data[2].subjectDetails,
              totalCredits: response.data[2].totalCredits,
              totalGPA: response.data[2].totalGPA,
              subjectCount: response.data[2].subjectCount,
              scorerId: response.data[2].scorerId,
              markedAt: response.data[2].markedAt,
              createdAt: response.data[2].createdAt,
            }
          : null;

        yearFour.value = response.data[3]
          ? {
              year: response.data[3].structureRecordName,
              subjectDetails: response.data[3].subjectDetails,
              totalCredits: response.data[3].totalCredits,
              totalGPA: response.data[3].totalGPA,
              subjectCount: response.data[3].subjectCount,
              scorerId: response.data[3].scorerId,
              markedAt: response.data[3].markedAt,
              createdAt: response.data[3].createdAt,
            }
          : null;
      } else {
        studentData.value = null;
        structureData.value = null;
        yearOne.value = null;
        yearTwo.value = null;
        yearThree.value = null;
        yearFour.value = null;
      }
    } catch (err: any) {
      error.value =
        err.message || "An error occurred while fetching transcript data";
      console.error("Transcript query error:", err);
    } finally {
      loading.value = false;
    }
  }

  return {
    studentData,
    structureData,
    yearOne,
    yearTwo,
    yearThree,
    yearFour,
    schoolInfo,
    loading,
    error,
    fetchTranscript,
  };
});
