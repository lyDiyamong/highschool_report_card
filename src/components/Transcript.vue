<template>
  <div v-if="loading" class="flex justify-center items-center min-h-screen">
    <div class="text-xl font-semibold">Loading...</div>
  </div>

  <!-- Do it here -->

  <!--  End -->

  <div v-else class="max-w-[1200px] mx-auto p-10 bg-white shadow-md">
    <div class="flex justify-between items-center mb-12">
      <!-- School Logo -->
      <div>
        <img
          width="120"
          src="https://www.ptec.edu.kh/wp-content/uploads/2020/06/cropped-Site-Icon.png"
          alt="College Logo"
          class="object-contain"
        />
        <h4 class="font-semibold">&#8470; . . . . . . . . . PTEC</h4>
      </div>

      <!-- Related School Name -->
      <div class="text-center">
        <h1 class="text-xl font-bold">KINGDOM OF CAMBODIA</h1>
        <h2 class="text-lg font-semibold">NATION RELIGION KING</h2>
        <div class="flex justify-center">
          <img
            src="https://clipart-library.com/2023/xcg6kxd9i.png"
            alt="Decorative Divider"
            class="w-24"
          />
        </div>
        <h3 class="text-lg text-blue-400 font-khmer">
          វិទ្យាស្ថាន​គរុកោសល្យ​រាជធានី​ភ្នំពេញ
        </h3>
        <h3 class="text-base font-semibold">
          PHNOM PENH TEACHER EDUCATION COLLEGE
        </h3>

        <!-- Letter Title -->
        <h2 class="text-2xl font-semibold my-12 text-blue-400 font-arsenal">
          Official Transcript
        </h2>
      </div>

      <!-- Student Photo -->
      <div class="student-photo">
        <div class="w-[120px] h-[150px] border border-gray-300">
          <!-- <img
            src="https://www.shutterstock.com/image-photo/young-hispanic-man-wearing-blue-600nw-2214648345.jpg"
            alt="profile"
            class="w-full h-full object-cover"
          /> -->
        </div>
      </div>
    </div>

    <!-- Student Information -->
    <div class="mb-8">
      <div class="flex mb-3">
        <div class="flex-1">
          <span class="font-bold mr-2">Name:</span>
          <span
            >{{ studentData?.studentFirstName || "N/A" }}
            {{ studentData?.studentLastName || "N/A" }}</span
          >
        </div>
        <div class="flex-1">
          <span class="font-bold mr-2">Student ID:</span>
          <span>{{ studentData?.idCard || "N/A" }}</span>
        </div>
      </div>

      <div class="flex mb-3">
        <div class="flex-1">
          <span class="font-bold mr-2">Native Name:</span>
          <span>
            {{ studentData?.studentFirstNameNative || "N/A" }}
            {{ studentData?.studentLastNameNative || "N/A" }}
          </span>
        </div>
        <div class="flex-1">
          <span class="font-bold mr-2">Date of Birth:</span>
          <span>{{ studentData?.dob || "DD/MM/YYYY" }}</span>
        </div>
      </div>

      <div class="flex mb-3">
        <div class="flex-1">
          <span class="font-bold mr-2">Gender:</span>
          <span>{{ studentData?.gender || "N/A" }}</span>
        </div>
      </div>
    </div>

    <!-- Transcript Table -->
    <div class="mb-8">
      <!-- Year 1 -->
      <div v-if="yearOne" class="mb-8">
        <h3 class="text-lg font-bold mb-4">{{ yearOne.year || "N/A" }}</h3>
        <div class="flex gap-5">
          <!-- Term 1 -->
          <div class="flex-1">
            <h4 class="font-semibold mb-2">Semester 1</h4>
            <table class="w-full border-collapse mb-4">
              <thead>
                <tr>
                  <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                    Code
                  </th>
                  <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                    Course Title
                  </th>
                  <th
                    class="border border-gray-300 p-2 bg-gray-50 text-center w-12"
                  >
                    Cr.
                  </th>
                  <th
                    class="border border-gray-300 p-2 bg-gray-50 text-center w-12"
                  >
                    Gr.
                  </th>
                  <th
                    class="border border-gray-300 p-2 bg-gray-50 text-center w-16"
                  >
                    GPA
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="subject in getSemesterSubjects(
                    yearOne.subjectDetails,
                    'Semester 1'
                  )"
                  :key="subject.subjectEvaluationId"
                  class="font-semibold"
                >
                  <td class="border border-gray-300 p-2 text-blue-400">
                    {{ subject.code }}
                  </td>
                  <td class="border border-gray-300 p-2">
                    {{ subject.subjectName }}
                  </td>
                  <td class="border border-gray-300 p-2 text-center">
                    {{ subject.credit }}
                  </td>
                  <td class="border border-gray-300 p-2 text-center">
                    {{ subject.grade }}
                  </td>
                  <td class="border border-gray-300 p-2 text-center">
                    {{ subject.gpa }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Term 2 -->
          <div class="flex-1">
            <h4 class="font-semibold mb-2">Semester 2</h4>
            <table class="w-full border-collapse mb-4">
              <thead>
                <tr>
                  <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                    Code
                  </th>
                  <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                    Course Title
                  </th>
                  <th
                    class="border border-gray-300 p-2 bg-gray-50 text-center w-12"
                  >
                    Cr.
                  </th>
                  <th
                    class="border border-gray-300 p-2 bg-gray-50 text-center w-12"
                  >
                    Gr.
                  </th>
                  <th
                    class="border border-gray-300 p-2 bg-gray-50 text-center w-16"
                  >
                    GPA
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="subject in getSemesterSubjects(
                    yearOne.subjectDetails,
                    'Semester 2'
                  )"
                  :key="subject.subjectEvaluationId"
                  class="font-semibold"
                >
                  <td class="border border-gray-300 p-2 text-blue-400">
                    {{ subject.code }}
                  </td>
                  <td class="border border-gray-300 p-2">
                    {{ subject.subjectName }}
                  </td>
                  <td class="border border-gray-300 p-2 text-center">
                    {{ subject.credit }}
                  </td>
                  <td class="border border-gray-300 p-2 text-center">
                    {{ subject.grade }}
                  </td>
                  <td class="border border-gray-300 p-2 text-center">
                    {{ subject.gpa }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="flex justify-between p-3 bg-gray-50 font-semibold">
          <span>GPA: {{ yearOne.totalGPA.toFixed(2) }}</span>
          <span>Credits: {{ yearOne.totalCredits }}</span>
        </div>
      </div>

      <!-- Year 2 -->
      <div v-if="yearTwo" class="mb-8">
        <h3 class="text-lg font-bold mb-4">{{ yearTwo.year }}</h3>
        <div class="flex gap-5">
          <!-- Term 1 -->
          <div class="flex-1">
            <h4 class="font-semibold mb-2">Semester 1</h4>
            <table class="w-full border-collapse mb-4">
              <thead>
                <tr>
                  <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                    Code
                  </th>
                  <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                    Course Title
                  </th>
                  <th
                    class="border border-gray-300 p-2 bg-gray-50 text-center w-12"
                  >
                    Cr.
                  </th>
                  <th
                    class="border border-gray-300 p-2 bg-gray-50 text-center w-12"
                  >
                    Gr.
                  </th>
                  <th
                    class="border border-gray-300 p-2 bg-gray-50 text-center w-16"
                  >
                    GPA
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="subject in getSemesterSubjects(
                    yearTwo.subjectDetails,
                    'Semester 1'
                  )"
                  :key="subject.subjectEvaluationId"
                  class="font-semibold"
                >
                  <td class="border border-gray-300 p-2 text-blue-400">
                    {{ subject.code }}
                  </td>
                  <td class="border border-gray-300 p-2">
                    {{ subject.subjectName }}
                  </td>
                  <td class="border border-gray-300 p-2 text-center">
                    {{ subject.credit }}
                  </td>
                  <td class="border border-gray-300 p-2 text-center">
                    {{ subject.grade }}
                  </td>
                  <td class="border border-gray-300 p-2 text-center">
                    {{ subject.gpa }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Term 2 -->
          <div class="flex-1">
            <h4 class="font-semibold mb-2">Semester 2</h4>
            <table class="w-full border-collapse mb-4">
              <thead>
                <tr>
                  <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                    Code
                  </th>
                  <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                    Course Title
                  </th>
                  <th
                    class="border border-gray-300 p-2 bg-gray-50 text-center w-12"
                  >
                    Cr.
                  </th>
                  <th
                    class="border border-gray-300 p-2 bg-gray-50 text-center w-12"
                  >
                    Gr.
                  </th>
                  <th
                    class="border border-gray-300 p-2 bg-gray-50 text-center w-16"
                  >
                    GPA
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="subject in getSemesterSubjects(
                    yearTwo.subjectDetails,
                    'Semester 2'
                  )"
                  :key="subject.subjectEvaluationId"
                  class="font-semibold"
                >
                  <td class="border border-gray-300 p-2 text-blue-400">
                    {{ subject.code }}
                  </td>
                  <td class="border border-gray-300 p-2">
                    {{ subject.subjectName }}
                  </td>
                  <td class="border border-gray-300 p-2 text-center">
                    {{ subject.credit }}
                  </td>
                  <td class="border border-gray-300 p-2 text-center">
                    {{ subject.grade }}
                  </td>
                  <td class="border border-gray-300 p-2 text-center">
                    {{ subject.gpa }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="flex justify-between p-3 bg-gray-50 font-semibold">
          <span>GPA: {{ yearTwo.totalGPA.toFixed(2) }}</span>
          <span>Credits: {{ yearTwo.totalCredits }}</span>
        </div>
      </div>

      <!-- Year 3 -->
      <div v-if="yearThree" class="mb-8">
        <h3 class="text-lg font-bold mb-4">{{ yearThree.year }}</h3>
        <div class="flex gap-5">
          <!-- Term 1 -->
          <div class="flex-1">
            <h4 class="font-semibold mb-2">Semester 1</h4>
            <table class="w-full border-collapse mb-4">
              <thead>
                <tr>
                  <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                    Code
                  </th>
                  <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                    Course Title
                  </th>
                  <th
                    class="border border-gray-300 p-2 bg-gray-50 text-center w-12"
                  >
                    Cr.
                  </th>
                  <th
                    class="border border-gray-300 p-2 bg-gray-50 text-center w-12"
                  >
                    Gr.
                  </th>
                  <th
                    class="border border-gray-300 p-2 bg-gray-50 text-center w-16"
                  >
                    GPA
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="subject in getSemesterSubjects(
                    yearThree.subjectDetails,
                    'Semester 1'
                  )"
                  :key="subject.subjectEvaluationId"
                  class="font-semibold"
                >
                  <td class="border border-gray-300 p-2 text-blue-400">
                    {{ subject.code }}
                  </td>
                  <td class="border border-gray-300 p-2">
                    {{ subject.subjectName }}
                  </td>
                  <td class="border border-gray-300 p-2 text-center">
                    {{ subject.credit }}
                  </td>
                  <td class="border border-gray-300 p-2 text-center">
                    {{ subject.grade }}
                  </td>
                  <td class="border border-gray-300 p-2 text-center">
                    {{ subject.gpa }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Term 2 -->
          <div class="flex-1">
            <h4 class="font-semibold mb-2">Semester 2</h4>
            <table class="w-full border-collapse mb-4">
              <thead>
                <tr>
                  <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                    Code
                  </th>
                  <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                    Course Title
                  </th>
                  <th
                    class="border border-gray-300 p-2 bg-gray-50 text-center w-12"
                  >
                    Cr.
                  </th>
                  <th
                    class="border border-gray-300 p-2 bg-gray-50 text-center w-12"
                  >
                    Gr.
                  </th>
                  <th
                    class="border border-gray-300 p-2 bg-gray-50 text-center w-16"
                  >
                    GPA
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="subject in getSemesterSubjects(
                    yearThree.subjectDetails,
                    'Semester 2'
                  )"
                  :key="subject.subjectEvaluationId"
                  class="font-semibold"
                >
                  <td class="border border-gray-300 p-2 text-blue-400">
                    {{ subject.code }}
                  </td>
                  <td class="border border-gray-300 p-2">
                    {{ subject.subjectName }}
                  </td>
                  <td class="border border-gray-300 p-2 text-center">
                    {{ subject.credit }}
                  </td>
                  <td class="border border-gray-300 p-2 text-center">
                    {{ subject.grade }}
                  </td>
                  <td class="border border-gray-300 p-2 text-center">
                    {{ subject.gpa }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="flex justify-between p-3 bg-gray-50 font-semibold">
          <span>GPA: {{ yearThree.totalGPA.toFixed(2) }}</span>
          <span>Credits: {{ yearThree.totalCredits }}</span>
        </div>
      </div>

      <!-- Year 4 -->
      <div v-if="yearFour" class="mb-8">
        <h3 class="text-lg font-bold mb-4">{{ yearFour.year }}</h3>
        <div class="flex gap-5">
          <!-- Term 1 -->
          <div class="flex-1">
            <h4 class="font-semibold mb-2">Semester 1</h4>
            <table class="w-full border-collapse mb-4">
              <thead>
                <tr>
                  <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                    Code
                  </th>
                  <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                    Course Title
                  </th>
                  <th
                    class="border border-gray-300 p-2 bg-gray-50 text-center w-12"
                  >
                    Cr.
                  </th>
                  <th
                    class="border border-gray-300 p-2 bg-gray-50 text-center w-12"
                  >
                    Gr.
                  </th>
                  <th
                    class="border border-gray-300 p-2 bg-gray-50 text-center w-16"
                  >
                    GPA
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="subject in getSemesterSubjects(
                    yearFour.subjectDetails,
                    'Semester 1'
                  )"
                  :key="subject.subjectEvaluationId"
                  class="font-semibold"
                >
                  <td class="border border-gray-300 p-2 text-blue-400">
                    {{ subject.code }}
                  </td>
                  <td class="border border-gray-300 p-2">
                    {{ subject.subjectName }}
                  </td>
                  <td class="border border-gray-300 p-2 text-center">
                    {{ subject.credit }}
                  </td>
                  <td class="border border-gray-300 p-2 text-center">
                    {{ subject.grade }}
                  </td>
                  <td class="border border-gray-300 p-2 text-center">
                    {{ subject.gpa }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Term 2 -->
          <div class="flex-1">
            <h4 class="font-semibold mb-2">Semester 2</h4>
            <table class="w-full border-collapse mb-4">
              <thead>
                <tr>
                  <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                    Code
                  </th>
                  <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                    Course Title
                  </th>
                  <th
                    class="border border-gray-300 p-2 bg-gray-50 text-center w-12"
                  >
                    Cr.
                  </th>
                  <th
                    class="border border-gray-300 p-2 bg-gray-50 text-center w-12"
                  >
                    Gr.
                  </th>
                  <th
                    class="border border-gray-300 p-2 bg-gray-50 text-center w-16"
                  >
                    GPA
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="subject in getSemesterSubjects(
                    yearFour.subjectDetails,
                    'Semester 2'
                  )"
                  :key="subject.subjectEvaluationId"
                  class="font-semibold"
                >
                  <td class="border border-gray-300 p-2 text-blue-400">
                    {{ subject.code }}
                  </td>
                  <td class="border border-gray-300 p-2">
                    {{ subject.subjectName }}
                  </td>
                  <td class="border border-gray-300 p-2 text-center">
                    {{ subject.credit }}
                  </td>
                  <td class="border border-gray-300 p-2 text-center">
                    {{ subject.grade }}
                  </td>
                  <td class="border border-gray-300 p-2 text-center">
                    {{ subject.gpa }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="flex justify-between p-3 bg-gray-50 font-semibold">
          <span>GPA: {{ yearFour.totalGPA.toFixed(2) }}</span>
          <span>Credits: {{ yearFour.totalCredits }}</span>
        </div>
      </div>
    </div>

    <!-- Totoal GPA -->
    <div>
      <div class="flex justify-between mb-5">
        <h4 class="text-lg font-bold">Total GPA: {{ cumulativeGPA }}</h4>
        <h4 class="text-lg font-bold">Total Credits: {{ totalCredits }}</h4>
      </div>
    </div>

    <!-- Grade Scale overview component -->
    <GradeScale />

    <!-- Footer -->
    <section class="mt-12 mb-8">
      <hr class="border-blue-400 border-[1px]" />
      <p class="text-center text-blue-400">
        #Address: 271 Street, Sangkat Ruusey Keo, Phnom Penh Cambodia.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import GradeScale from "./GradeScale.vue";
import {
  useTranscriptStore,
  type StudentData,
  type StructureData,
  type YearlyData,
} from "../stores/transcript/transcriptClickhouse";

const transcriptStore = useTranscriptStore();
const {
  studentData,
  structureData,
  yearOne,
  yearTwo,
  yearThree,
  yearFour,
  loading,
} = storeToRefs<{
  studentData: StudentData | null;
  structureData: StructureData | null;
  yearOne: YearlyData | null;
  yearTwo: YearlyData | null;
  yearThree: YearlyData | null;
  yearFour: YearlyData | null;
  loading: boolean;
}>(transcriptStore);
const { fetchTranscript } = transcriptStore;

onMounted(async () => {
  try {
    await fetchTranscript({
      idCard: "110022",
      groupStructureId: "30fe5773-ee9f-4c97-a808-c1d5a4a342f1",
    });
  } catch (err) {
    console.error("Failed to fetch transcript data:", err);
  }
});

// Calculate cumulative GPA and total credits from actual year data
const calculateCumulativeStats = computed(() => {
  const years = [
    yearOne.value,
    yearTwo.value,
    yearThree.value,
    yearFour.value,
  ].filter((year) => year !== null);

  const semesters = computed(
    () => structureData.value?.structureRecordName || ["Semester 1", "Semester 2"]
  );

  if (years.length === 0) {
    return {
      cumulativeGPA: 0,
      totalCredits: 0,
    };
  }

  const totalGPAPoints = years.reduce(
    (sum, year) => sum + year.totalGPA * year.totalCredits,
    0
  );
  const totalCredits = years.reduce((sum, year) => sum + year.totalCredits, 0);

  const cumulativeGPA =
    totalCredits > 0 ? (totalGPAPoints / totalCredits).toFixed(2) : "0.00";

  return {
    cumulativeGPA,
    totalCredits,
  };
});

// Replace the ref values with computed values
const cumulativeGPA = computed(
  () => calculateCumulativeStats.value.cumulativeGPA
);
const totalCredits = computed(
  () => calculateCumulativeStats.value.totalCredits
);

// Helper function to filter subjects by semester
const getSemesterSubjects = (subjectDetails: any[], semesterName: string) => {
  if (!Array.isArray(subjectDetails)) return [];
  return subjectDetails.filter(
    (subject) => subject.semesterName === semesterName
  );
};
</script>
