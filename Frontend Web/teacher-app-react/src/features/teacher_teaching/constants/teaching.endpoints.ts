import { RequestParams } from "types/param.types";

const TeachingEndpoints = {
  GET_MY_CLASSES: ({ page, pageSize, search }: RequestParams) => {
    if (search === undefined || search === "") {
      return `/teacher-classes?page=${page}&pageSize=${pageSize}`;
    }
    return `/teacher-classes?search=${search}&page=${page}&pageSize=${pageSize}`;
  },
  GET_CLASS: (id: number) => `/class/${id}`,
  GET_MY_ONLINE_TEST_SCORES: ({ id, page, pageSize }: RequestParams) => {
    return `/student/${id}/online-test-scores?page=${page}&pageSize=${pageSize}`;
  },
  GET_MY_OFFLINE_TEST_SCORES: ({ id, page, pageSize }: RequestParams) => {
    return `/student/${id}/offline-test-scores?page=${page}&pageSize=${pageSize}`;
  },
  UPDATE_OFFLINE_TEST_SCORE: (id: number) =>  `update-offline-test-score/${id}`,
  MY_TEACHING_SCHEDULE: () =>  `/my-teaching-schedule`,
  GET_QUIZZES: ({ page, pageSize, search }: RequestParams) => {
    if (search === undefined || search === "") {
      return `/quizzes?page=${page}&pageSize=${pageSize}`;
    }
    return `/quizzes?search=${search}&page=${page}&pageSize=${pageSize}`;
  },
  GET_QUIZZ: (id: number) => `/quiz/${id}`,
  DELETE_QUIZ: (id: number) => `/delete-quiz/${id}`,
  ENTER_TRANSCRIPT: () => `/enter-transcript`,
  CREATE_QUIZ: () => `/create-quiz`,
  GET_ASSIGNED_CLASSES_BY_QUIZID: (id: number) => `/assiged-classes/${id}`,
  GET_ASSIGNABLE_CLASSES_BY_QUIZID: (id: number) => `/assignable-classes/${id}`,
  ASSIGN_CLASSES: () => `/assign-quiz-class`
};

export default TeachingEndpoints;
