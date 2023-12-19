import { PaginationResponse } from "types/pagination.types";

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

export interface LearningState {
    onlineTestScores: GetAllOnlineTestScores | null;
    offlineTestScores: GetAllOfflineTestScores | null;
    myTests: GetAllMyTest | null;
}