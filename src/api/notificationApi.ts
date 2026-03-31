import axiosClient from './axiosClient';
import type { Notification } from '../types';

const notificationApi = {
  getAll: () =>
    axiosClient.get<Notification[]>('/notifications'),

  markRead: (id: string) =>
    axiosClient.put(`/notifications/${id}/read`),

  markAllRead: () =>
    axiosClient.put('/notifications/read-all'),

  // Admin only
  broadcast: (data: { title: string; message: string; type: Notification['type'] }) =>
    axiosClient.post('/admin/notifications/broadcast', data),
};

export default notificationApi;
