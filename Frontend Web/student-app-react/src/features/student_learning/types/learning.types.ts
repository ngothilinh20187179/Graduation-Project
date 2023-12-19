import { PaginationResponse } from "types/pagination.types";
import { ClassPeriodType, ClassStatusType, DayOfWeek, SubjectStatusType } from "../student_learning";
import { BasicUserInfo, UserAvatar } from "features/student_users/student_users";

export type OnlineTestScores = {
    id: number;
    quizId: string;
    nameQuiz: string;
    point: number;
    totalPoint: number;
    created: string;
}

export type OfflineTestScores = {
    id: number;
    name: string;
    point: number;
    totalPoint: number;
    created: string;
}

export type MyTest = {
    id: number;
    name: string;
    duration: string;
    created: string;
    status: number;
}

export interface GetAllOnlineTestScores extends PaginationResponse {
    data: OnlineTestScores[];
}

export interface GetAllOfflineTestScores extends PaginationResponse {
    data: OfflineTestScores[];
}

export interface GetAllMyTest extends PaginationResponse {
    data: MyTest[];
}

export type Subject = {
  id?: number;
  subjectName: string;
  subjectDescription: string;
  subjectStatus: SubjectStatusType;
  note: string | null;
};

export type Class = {
    id?: number;
    className: string;
    classStartDate: string;
    classEndDate: string | null;
    numberOfStudents: number;
    numberOfSessions: number;
    credit: number;
    classStatus: ClassStatusType
  };
  
  export interface GetAllClassesResponse extends PaginationResponse {
    data: Class[];
  }
  
  export type ClassSchedules = {
    id: number;
    period: ClassPeriodType;
    dayOfWeek: DayOfWeek;
    roomId: number;
    roomName: string;
  }
  
  export type BasicTeacherInfo = BasicUserInfo & {
    avatar: UserAvatar | null;
  }
  
  export type GetClassResponse = {
    data: Class & {
      note?: string;
      classStatus: ClassStatusType;
      subject: Subject;
      classSchedules: ClassSchedules[];
      teachers?: BasicTeacherInfo[];
    };
  }

export interface LearningState {
    onlineTestScores: GetAllOnlineTestScores | null;
    offlineTestScores: GetAllOfflineTestScores | null;
    myTests: GetAllMyTest | null;
    classes: GetAllClassesResponse | null;
    classDetail: GetClassResponse | null;
}