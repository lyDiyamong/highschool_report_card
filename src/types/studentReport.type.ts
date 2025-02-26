interface SubjectDetail {
    subjectEvaluationId: string;
    subjectName: string;
    subjectNameNative: string;
    code: string;
    credit: number;
    score: number;
    maxScore : number;
    percentage: number;
    grade: string;
    meaning: string;
    gpa: number;
    subjectParentName: string;
    subjectParentEvaluationId: string;
    subjectParentType: string;
    monthName: string;
    monthEvaluationId: string | null;
    semesterName: string;
    semesterEvaluationId: string;
  }
  
export interface StudentReportDataType {
    schoolId: string;
    campusId: string;
    structureRecordId: string;
    structureRecordName: string;
    groupStructureId: string;
    structurePath: string;
    studentId: string;
    studentFirstName: string;
    studentLastName: string;
    studentFirstNameNative: string;
    studentLastNameNative: string;
    idCard: string;
    dob: string | null;
    gender: "male" | "female" | "other";
    subjectDetails: SubjectDetail[];
  
  }