import axiosClient from './axiosClient';
import type { TestResult } from '../types';

export interface SubmitTestRequest {
  testId: string;
  timeTakenSeconds: number;
  answers: {
    questionId: string;
    selectedAnswer: string;
  }[];
}

const resultApi = {
  submit: (data: SubmitTestRequest) =>
    axiosClient.post<TestResult>('/results', data),

  getMyResults: () =>
    axiosClient.get<TestResult[]>('/results/me'),

  getByTestId: (testId: string) =>
    axiosClient.get<TestResult>(`/results/me/${testId}`),

  // Admin
  getAll: () =>
    axiosClient.get<TestResult[]>('/admin/results'),
};

export default resultApi;
