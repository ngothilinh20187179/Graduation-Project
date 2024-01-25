import { PaginationResponse } from "types/pagination.types";
import {
  BasicUserInfo,
  UserAvatar,
} from "features/teacher_users/teacher_users";
import { AttendanceStatusType, ClassPeriodType, ClassStatusType, DayOfWeek, SubjectStatusType } from "../teaching.types";

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

export type OnlineTestScores = {
  id: number;
  quizId: string;
  nameQuiz: string;
  point: number;
  totalPoint: number;
  created: string;
};

export type OfflineTestScores = {
  id: number;
  name: string;
  point: number;
  totalPoint: number;
  created: string;
};

export interface GetAllOnlineTestScores extends PaginationResponse {
  data: OnlineTestScores[];
}

export interface GetAllOfflineTestScores extends PaginationResponse {
  data: OfflineTestScores[];
}

export type Mark = {
  id: number;
  point: number;
};

export type TeachingSchedule = {
  id: number;
  className: string;
  schedules: ClassSchedules[];
};

export interface GetAllMyTeachingSchedule {
  data: TeachingSchedule[];
}

export type QuizBasicInfo = {
  id: number;
  name: string;
  duration: string;
  created: string;
  status: number;
};

export interface GetAllQuizzes extends PaginationResponse {
  data: QuizBasicInfo[];
}

export type Quiz = {
  id: number;
  name: string;
  duration: string;
  created: string;
  totalPoint: number;
  totalQuestion: number;
  questions: Questions[];
};

export type Questions = {
  id: number;
  questionText: string;
  point: number;
  order: number;
  answers: Answer[];
};

export type Answer = {
  id: number;
  answerText: string;
};

export type GetQuizResponse = {
  data: Quiz;
};

export type EnterTranscript = {
  name: string;
  totalPoint: number;
  transcripts: Transcript[];
};

export type Transcript = {
  studentId: number;
  point: number | null;
};

export type CreateAnwer = {
  answerText: string;
  isCorrect: boolean;
}

export type CreateQuestion = {
  questionText: string;
  point: number;
  answers: CreateAnwer[];
}

export type CreateQuiz = {
  name: string;
  duration: string;
  questions: CreateQuestion[];
};

export type ClassNameAndId = {
  id: number;
  className: string;
}

export type AssignClasses = {
  quizId: number;
  classId: number[];
}

export type StudentAttendance = {
  id: number;
  firstName: string;
  lastName: string;
  status: AttendanceStatusType;
  reason: string | null;
}

export type TakeStudentAttendance = {
  classId: number;
  data: StudentAttendance[];
}

export interface TeachingState {
  classes: GetAllClassesResponse | null;
  classDetail: GetClassResponse | null;
  onlineTestScores: GetAllOnlineTestScores | null;
  offlineTestScores: GetAllOfflineTestScores | null;
  myTeachingSchedule: GetAllMyTeachingSchedule | null;
  quizzes: GetAllQuizzes | null;
  quiz: GetQuizResponse | null;
}
