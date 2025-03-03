export interface DwdReportDataType {
    schoolName: string;
    eventName : string;
    eventCount : number;
    studentDetails : DetailCount;
    professionalDetails: DetailCount;
    otherDetails: DetailCount; 
}

interface DetailCount {
    male: number;
    female : number;
    other: number;
    total: number;
}