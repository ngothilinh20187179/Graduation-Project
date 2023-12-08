import { PaginationResponse } from "types/pagination.types";
import { ClassPeriodType, ClassStatusType, DayOfWeek, RoomStatusType, SubjectStatusType } from "../constants/classes.constants";
import { BasicUserInfo, UserAvatar } from "features/staff_users/staff_users";

export type Subject = {
  id?: number;
  subjectName: string;
  subjectDescription: string;
  subjectStatus: SubjectStatusType;
  note: string | null;
};

export type BasicSubjects = {
  id: number;
  subjectName: string;
  subjectDescription: string;
};

export interface GetAllSubjectsResponse extends PaginationResponse {
  data: Subject[];
}

export interface GetSubjectResponse {
  data: Subject
}

export type Room = {
  id?: number;
  name: string;
  size: number | null;
  roomStatus: RoomStatusType;
  note: string | null;
};

export interface GetAllRoomsResponse extends PaginationResponse {
  data: Room[];
}

export interface GetRoomResponse {
  data: Room
}

export type Class = {
  id?: number;
  className: string;
  classStartDate: string;
  classEndDate: string | null;
  numberOfStudents: number;
  numberOfSessions: number;
  credit: number;
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

export type CreateEditClassInfo = Class & {
  note: string | null;
  classStatus: ClassStatusType;
} 

export interface ClassesState {
  classes: GetAllClassesResponse | null;
  classDetail: GetClassResponse | null;
  subjects: GetAllSubjectsResponse | null;
  subject: GetSubjectResponse | null;
  rooms: GetAllRoomsResponse | null;
  room: GetRoomResponse | null;
}
