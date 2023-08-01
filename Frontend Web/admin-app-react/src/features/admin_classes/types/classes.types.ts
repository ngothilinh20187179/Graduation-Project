import { PaginationResponse } from "types/pagination.types";
import { RoomStatusType, SubjectStatusType } from "../constants/classes.constants";

export type Subject = {
  id?: number;
  subjectName: string;
  subjectDescription: string;
  subjectStatus: SubjectStatusType;
  note: string | null;
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

export interface ClassesState {
  subjects: GetAllSubjectsResponse | null;
  subject: GetSubjectResponse | null;
  rooms: GetAllRoomsResponse | null;
  room: GetRoomResponse | null;
}
