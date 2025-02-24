<template>
  <div class="max-w-[1200px] mx-auto p-5 bg-white shadow-md">
    <div class="flex justify-between items-center mb-8">
      <div class="header-logo">
        <img
          width="120"
          src="https://workingna-files.s3.ap-southeast-1.amazonaws.com/1645761959094-sala_cover-01.png"
          alt="College Logo"
          class="object-contain"
        />
      </div>
      <div class="text-center">
        <h1 class="text-xl font-bold">KINGDOM OF CAMBODIA</h1>
        <h2 class="text-lg font-semibold">NATION RELIGION KING</h2>
        <h3 class="text-base">PHNOM PENH TEACHER EDUCATION COLLEGE</h3>
      </div>
      <div class="student-photo">
        <div class="w-[120px] h-[150px] border border-gray-300"></div>
      </div>
    </div>

    <div class="mb-8">
      <div class="flex mb-3">
        <div class="flex-1">
          <span class="font-bold mr-2">Name:</span>
          <span>{{ studentInfo.name }}</span>
        </div>
        <div class="flex-1">
          <span class="font-bold mr-2">Student ID:</span>
          <span>{{ studentInfo.id }}</span>
        </div>
      </div>
      <div class="flex mb-3">
        <div class="flex-1">
          <span class="font-bold mr-2">Date of Birth:</span>
          <span>{{ studentInfo.dateOfBirth }}</span>
        </div>
        <div class="flex-1">
          <span class="font-bold mr-2">Place of Birth:</span>
          <span>{{ studentInfo.placeOfBirth }}</span>
        </div>
      </div>
      <div class="flex mb-3">
        <div class="flex-1">
          <span class="font-bold mr-2">Degree:</span>
          <span>{{ studentInfo.degree }}</span>
        </div>
        <div class="flex-1">
          <span class="font-bold mr-2">Major:</span>
          <span>{{ studentInfo.major }}</span>
        </div>
      </div>
    </div>

    <div class="mb-8">
      <div v-for="year in 4" :key="year" class="mb-8">
        <h3 class="text-lg font-bold mb-4">Year {{ year }}</h3>
        <div class="flex gap-5">
          <div class="flex-1">
            <h4 class="font-semibold mb-2">Term 1</h4>
            <table class="w-full border-collapse mb-4">
              <thead>
                <tr>
                  <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                    Code
                  </th>
                  <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                    Course Title
                  </th>
                  <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                    Cr.
                  </th>
                  <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                    Gr.
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="course in getCoursesForSemester(year, 1)"
                  :key="course.code"
                >
                  <td class="border border-gray-300 p-2">{{ course.code }}</td>
                  <td class="border border-gray-300 p-2">{{ course.title }}</td>
                  <td class="border border-gray-300 p-2">
                    {{ course.credits }}
                  </td>
                  <td class="border border-gray-300 p-2">{{ course.grade }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex-1">
            <h4 class="font-semibold mb-2">Term 2</h4>
            <table class="w-full border-collapse mb-4">
              <thead>
                <tr>
                  <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                    Code
                  </th>
                  <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                    Course Title
                  </th>
                  <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                    Cr.
                  </th>
                  <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                    Gr.
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="course in getCoursesForSemester(year, 2)"
                  :key="course.code"
                >
                  <td class="border border-gray-300 p-2">{{ course.code }}</td>
                  <td class="border border-gray-300 p-2">{{ course.title }}</td>
                  <td class="border border-gray-300 p-2">
                    {{ course.credits }}
                  </td>
                  <td class="border border-gray-300 p-2">{{ course.grade }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="flex justify-between p-3 bg-gray-50 font-semibold">
          <span>GPA: {{ getYearGPA(year) }}</span>
          <span>Credits: {{ getYearCredits(year) }}</span>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <div class="flex justify-between mb-5 max-w-[50%]">
        <h4 class="text-lg font-bold">Cumulative GPA: {{ cumulativeGPA }}</h4>
        <h4 class="text-lg font-bold">Total Credits: {{ totalCredits }}</h4>
      </div>
      <div class="text-sm">
        <table class="w-full border-collapse">
          <thead>
            <tr>
              <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                Mark Obtained
              </th>
              <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                Grade
              </th>
              <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                Grade Point Average
              </th>
              <th class="border border-gray-300 p-2 bg-gray-50 text-left">
                Meaning
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="grade in gradeScale" :key="grade.mark">
              <td class="border border-gray-300 p-2">{{ grade.mark }}</td>
              <td class="border border-gray-300 p-2">{{ grade.grade }}</td>
              <td class="border border-gray-300 p-2">{{ grade.gpa }}</td>
              <td class="border border-gray-300 p-2">{{ grade.meaning }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Course {
  code: string;
  title: string;
  credits: number;
  grade: string;
}

interface YearData {
  term1: Course[];
  term2: Course[];
  gpa: string;
  credits: number;
}

const studentInfo = ref({
  name: "SAMON ROTHA",
  id: "112233",
  dateOfBirth: "Dec 22, 2004",
  placeOfBirth: "Russey Keo, Phnom Penh",
  degree: "Bachelor of Education",
  major: "Chemistry",
});

const gradeScale = ref([
  { mark: "85%-100%", grade: "A", gpa: "4.00", meaning: "Excellent" },
  { mark: "80%-84%", grade: "B+", gpa: "3.50", meaning: "Very Good" },
  { mark: "70%-79%", grade: "B", gpa: "3.00", meaning: "Good" },
  { mark: "65%-69%", grade: "C+", gpa: "2.50", meaning: "Fairly Good" },
  { mark: "50%-64%", grade: "C", gpa: "2.00", meaning: "Fair" },
  { mark: "45%-49%", grade: "D", gpa: "1.50", meaning: "Poor" },
  { mark: "40%-44%", grade: "E", gpa: "1.00", meaning: "Very Poor" },
  { mark: "<40%", grade: "F", gpa: "0.00", meaning: "Failure" },
]);

const academicData = ref<Record<number, YearData>>({
  1: {
    term1: [
      {
        code: "ESSC101",
        title: "Educational Psychology",
        credits: 1,
        grade: "B+",
      },
      {
        code: "ESSC102",
        title: "Professional Practice and Inquiry I",
        credits: 1,
        grade: "A",
      },
      {
        code: "ESSC103",
        title: "General Topics in Education",
        credits: 1,
        grade: "A",
      },
      {
        code: "ESSC104",
        title: "Environmental Education",
        credits: 1,
        grade: "A",
      },
      { code: "ASSC105", title: "Biology 01", credits: 2.5, grade: "A" },
      { code: "ASSC106", title: "Chemistry 01", credits: 2, grade: "B+" },
      { code: "ASSC107", title: "Physics 01", credits: 4, grade: "A" },
      { code: "ASSC108", title: "Earth Science 01", credits: 1, grade: "A" },
      {
        code: "ESSC109",
        title: "Academic Discourse Skills",
        credits: 1,
        grade: "A",
      },
      { code: "ESSC110", title: "Physical Practice", credits: 0.5, grade: "A" },
      {
        code: "ESSC111",
        title: "Use of ICT in Teaching and Learning",
        credits: 1,
        grade: "B",
      },
    ],
    term2: [
      { code: "ASSC112", title: "Biology 02", credits: 2.5, grade: "A" },
      { code: "ASSC113", title: "Chemistry 02", credits: 3, grade: "A" },
      { code: "ASSC114", title: "Physics 02", credits: 3, grade: "A" },
      { code: "ASSC115", title: "Earth Science 02", credits: 2, grade: "B+" },
      {
        code: "LESC116",
        title: "English Grammar and Composition I",
        credits: 3,
        grade: "A",
      },
      { code: "PESC117", title: "Physical Practice", credits: 0.5, grade: "A" },
      {
        code: "ECSC118",
        title: "Use of ICT in Teaching and Learning",
        credits: 1,
        grade: "A",
      },
      { code: "SESC119", title: "School Experience", credits: 1, grade: "A" },
    ],
    gpa: "3.81",
    credits: 34,
  },
  2: {
    term1: [
      {
        code: "ESSC201",
        title: "Teaching and Managing Learners at Lower Secondary Level I",
        credits: 2,
        grade: "A",
      },
      {
        code: "ESSC202",
        title: "Technologies for Meaningful Learning",
        credits: 1,
        grade: "A",
      },
      { code: "ASSC203", title: "Biology", credits: 1, grade: "A" },
      { code: "ASSC204", title: "Chemistry", credits: 2, grade: "A" },
      { code: "ASSC205", title: "Physics", credits: 2, grade: "B" },
      { code: "ASSC206", title: "Earth Science", credits: 1, grade: "A" },
      {
        code: "ASSC207",
        title: "Basic Mathematics for Science",
        credits: 3,
        grade: "B+",
      },
      {
        code: "ESSC208",
        title: "Curriculum and Pedagogy in Chemistry",
        credits: 1,
        grade: "A",
      },
      {
        code: "LESC209",
        title: "English Grammar and Composition II",
        credits: 3,
        grade: "B",
      },
      { code: "ECSC210", title: "Physical Practice", credits: 0.5, grade: "A" },
    ],
    term2: [
      {
        code: "ESSC211",
        title: "Educational Psychology II",
        credits: 1,
        grade: "B+",
      },
      {
        code: "ESSC212",
        title: "Technologies for Meaningful Learning",
        credits: 1,
        grade: "B+",
      },
      {
        code: "ESSC213",
        title: "Assessing Learning and Performance",
        credits: 1,
        grade: "B+",
      },
      { code: "ASSC214", title: "Biology", credits: 2, grade: "A" },
      { code: "ASSC215", title: "Chemistry", credits: 1, grade: "A" },
      { code: "ASSC216", title: "Physics", credits: 1, grade: "B" },
      { code: "ASSC217", title: "Earth Science", credits: 1, grade: "B+" },
      {
        code: "ASSC218",
        title: "Statistics for Science",
        credits: 1,
        grade: "C",
      },
      {
        code: "CSSC219",
        title: "Curriculum and Pedagogy in Chemistry",
        credits: 2,
        grade: "A",
      },
      { code: "PESC220", title: "Physical Practice", credits: 0.5, grade: "A" },
      {
        code: "PRSC221",
        title: "Teaching Assistantship",
        credits: 5,
        grade: "A",
      },
    ],
    gpa: "3.65",
    credits: 33,
  },
  3: {
    term1: [
      {
        code: "ESSC201",
        title: "Teaching and Managing Learners at Lower Secondary Level I",
        credits: 2,
        grade: "A",
      },
      {
        code: "ESSC202",
        title: "Technologies for Meaningful Learning",
        credits: 1,
        grade: "A",
      },
      { code: "ASSC203", title: "Biology", credits: 1, grade: "A" },
      { code: "ASSC204", title: "Chemistry", credits: 2, grade: "A" },
      { code: "ASSC205", title: "Physics", credits: 2, grade: "B" },
      { code: "ASSC206", title: "Earth Science", credits: 1, grade: "A" },
      {
        code: "ASSC207",
        title: "Basic Mathematics for Science",
        credits: 3,
        grade: "B+",
      },
      {
        code: "ESSC208",
        title: "Curriculum and Pedagogy in Chemistry",
        credits: 1,
        grade: "A",
      },
      {
        code: "LESC209",
        title: "English Grammar and Composition II",
        credits: 3,
        grade: "B",
      },
      { code: "ECSC210", title: "Physical Practice", credits: 0.5, grade: "A" },
    ],
    term2: [
      {
        code: "ESSC211",
        title: "Educational Psychology II",
        credits: 1,
        grade: "B+",
      },
      {
        code: "ESSC212",
        title: "Technologies for Meaningful Learning",
        credits: 1,
        grade: "B+",
      },
      {
        code: "ESSC213",
        title: "Assessing Learning and Performance",
        credits: 1,
        grade: "B+",
      },
      { code: "ASSC214", title: "Biology", credits: 2, grade: "A" },
      { code: "ASSC215", title: "Chemistry", credits: 1, grade: "A" },
      { code: "ASSC216", title: "Physics", credits: 1, grade: "B" },
      { code: "ASSC217", title: "Earth Science", credits: 1, grade: "B+" },
      {
        code: "ASSC218",
        title: "Statistics for Science",
        credits: 1,
        grade: "C",
      },
      {
        code: "CSSC219",
        title: "Curriculum and Pedagogy in Chemistry",
        credits: 2,
        grade: "A",
      },
      { code: "PESC220", title: "Physical Practice", credits: 0.5, grade: "A" },
      {
        code: "PRSC221",
        title: "Teaching Assistantship",
        credits: 5,
        grade: "A",
      },
    ],
    gpa: "3.91",
    credits: 33,
  },
  4: {
    term1: [
      {
        code: "ESSC101",
        title: "Educational Psychology",
        credits: 1,
        grade: "B+",
      },
      {
        code: "ESSC102",
        title: "Professional Practice and Inquiry I",
        credits: 1,
        grade: "A",
      },
      {
        code: "ESSC103",
        title: "General Topics in Education",
        credits: 1,
        grade: "A",
      },
      {
        code: "ESSC104",
        title: "Environmental Education",
        credits: 1,
        grade: "A",
      },
      { code: "ASSC105", title: "Biology 01", credits: 2.5, grade: "A" },
      { code: "ASSC106", title: "Chemistry 01", credits: 2, grade: "B+" },
      { code: "ASSC107", title: "Physics 01", credits: 4, grade: "A" },
      { code: "ASSC108", title: "Earth Science 01", credits: 1, grade: "A" },
      {
        code: "ESSC109",
        title: "Academic Discourse Skills",
        credits: 1,
        grade: "A",
      },
      { code: "ESSC110", title: "Physical Practice", credits: 0.5, grade: "A" },
      {
        code: "ESSC111",
        title: "Use of ICT in Teaching and Learning",
        credits: 1,
        grade: "B",
      },
    ],
    term2: [
      { code: "ASSC112", title: "Biology 02", credits: 2.5, grade: "A" },
      { code: "ASSC113", title: "Chemistry 02", credits: 3, grade: "A" },
      { code: "ASSC114", title: "Physics 02", credits: 3, grade: "A" },
      { code: "ASSC115", title: "Earth Science 02", credits: 2, grade: "B+" },
      {
        code: "LESC116",
        title: "English Grammar and Composition I",
        credits: 3,
        grade: "A",
      },
      { code: "PESC117", title: "Physical Practice", credits: 0.5, grade: "A" },
      {
        code: "ECSC118",
        title: "Use of ICT in Teaching and Learning",
        credits: 1,
        grade: "A",
      },
      { code: "SESC119", title: "School Experience", credits: 1, grade: "A" },
    ],
    gpa: "3.97",
    credits: 35,
  },
});

// Update the functions to use the actual data
const getCoursesForSemester = (year: number, semester: number): Course[] => {
  const yearData = academicData.value[year];
  if (!yearData) return [];
  return semester === 1 ? yearData.term1 : yearData.term2;
};

const getYearGPA = (year: number): string => {
  return academicData.value[year]?.gpa || "0.00";
};

const getYearCredits = (year: number): number => {
  return academicData.value[year]?.credits || 0;
};

const cumulativeGPA = ref("3.84");
const totalCredits = ref(135);
</script>

<style scoped>
/* .transcript-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.transcript-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header-text {
  text-align: center;
}

.photo-box {
  width: 120px;
  height: 150px;
  border: 1px solid #ccc;
}

.student-info {
  margin-bottom: 30px;
}

.info-row {
  display: flex;
  margin-bottom: 10px;
}

.info-item {
  flex: 1;
}

.label {
  font-weight: bold;
  margin-right: 10px;
}

.academic-records {
  margin-bottom: 30px;
}

.academic-year {
  margin-bottom: 30px;
}

.semesters {
  display: flex;
  gap: 20px;
}

.semester {
  flex: 1;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f5f5f5;
}

.semester-summary {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding: 10px;
  background-color: #f5f5f5;
}

.transcript-footer {
  margin-top: 30px;
}

.total-summary {
  text-align: right;
  margin-bottom: 20px;
}

.grade-scale table {
  font-size: 0.9em;
} */
</style>
