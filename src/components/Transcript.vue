<template>
  <div class="max-w-[1200px] mx-auto p-10 bg-white shadow-md">
    <div class="flex justify-between items-center mb-12">
      <!-- School Logo -->
      <div class="header-logo">
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
        <h2 class="text-2xl font-semibold my-12 text-blue-400 font-arsenal">Official Transcript</h2>
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
                  class="font-semibold"
                  v-for="course in getCoursesForSemester(year, 1)"
                  :key="course.code"
                >
                  <td class="border border-gray-300 p-2 text-blue-400">
                    {{ course.code }}
                  </td>
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
                  class="font-semibold"
                  v-for="course in getCoursesForSemester(year, 2)"
                  :key="course.code"
                >
                  <td class="border border-gray-300 p-2 text-blue-400">
                    {{ course.code }}
                  </td>
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

    <div>
      <div class="flex justify-between mb-5 max-w-[50%]">
        <h4 class="text-lg font-bold">Cumulative GPA: {{ cumulativeGPA }}</h4>
        <h4 class="text-lg font-bold">Total Credits: {{ totalCredits }}</h4>
      </div>
    </div>

    <!-- Grade Scale overview component -->
    <GradeScale />

    <section class="mt-12 mb-8">
      <hr class="border-blue-400 border-[1px]" />
      <p class="text-center text-blue-400">
        #Address: 271 Street, Sangkat Ruusey Keo, Phnom Penh Cambodia.
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import GradeScale from "./GradeScale.vue";

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
