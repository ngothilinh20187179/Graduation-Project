import { PaginationResponse } from "types/pagination.types";
import { SubjectStatusType } from "../constants/classes.constants";

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

export interface ClassesState {
  subjects: GetAllSubjectsResponse | null;
}
