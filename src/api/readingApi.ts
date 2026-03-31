import axiosClient from './axiosClient';
import type { ReadingPassage } from '../types';

const readingApi = {
  getPassages: (params?: { difficulty?: string; search?: string }) =>
    axiosClient.get<ReadingPassage[]>('/reading', { params }),

  getById: (id: string) =>
    axiosClient.get<ReadingPassage>(`/reading/${id}`),
};

export default readingApi;
