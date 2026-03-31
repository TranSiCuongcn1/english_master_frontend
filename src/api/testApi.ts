import axiosClient from './axiosClient';
import type { Test } from '../types';

const testApi = {
  getAll: (params?: { category?: string; year?: number }) =>
    axiosClient.get<Test[]>('/tests', { params }),

  getById: (id: string) =>
    axiosClient.get<Test>(`/tests/${id}`),

  getByCategory: (category: string) =>
    axiosClient.get<Test[]>('/tests', { params: { category } }),

  // Admin only
  create: (data: Partial<Test>) =>
    axiosClient.post<Test>('/admin/tests', data),

  update: (id: string, data: Partial<Test>) =>
    axiosClient.put<Test>(`/admin/tests/${id}`, data),

  delete: (id: string) =>
    axiosClient.delete(`/admin/tests/${id}`),
};

export default testApi;
