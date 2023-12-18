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

export interface GetAllOnlineTestScores extends PaginationResponse {
    data: OnlineTestScores[];
}

export interface GetAllOfflineTestScores extends PaginationResponse {
    data: OfflineTestScores[];
}

export interface LearningState {
    onlineTestScores: GetAllOnlineTestScores | null;
    offlineTestScores: GetAllOfflineTestScores | null;
}