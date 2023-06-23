import { PaginationResponse } from "types/pagination.types";
import { SubjectStatusType } from "../admin_classes";

export type Subject = {
  id?: number;
  subjectName: string;
  subjectDescription: string;
  subjectStatus: SubjectStatusType;
  note: string | null;
};

export interface GetAllSubjectsResponse extends PaginationResponse {
  subjects: Subject[];
}

export interface ClassesState {
  subjects: GetAllSubjectsResponse | null;
}
