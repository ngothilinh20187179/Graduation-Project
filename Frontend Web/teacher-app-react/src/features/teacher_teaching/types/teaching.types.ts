import { PaginationResponse } from "types/pagination.types";
import {
  BasicUserInfo,
  UserAvatar,
} from "features/teacher_users/teacher_users";
import { ClassPeriodType, ClassStatusType, DayOfWeek, SubjectStatusType } from "../teaching.types";

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
  classStatus: ClassStatusType;
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
};

export type BasicTeacherInfo = BasicUserInfo & {
  avatar: UserAvatar | null;
};

export type GetClassResponse = {
  data: Class & {
    note?: string;
    classStatus: ClassStatusType;
    subject: Subject;
    classSchedules: ClassSchedules[];
    teachers?: BasicTeacherInfo[];
  };
};

export interface TeachingState {
  classes: GetAllClassesResponse | null;
  classDetail: GetClassResponse | null;
}
