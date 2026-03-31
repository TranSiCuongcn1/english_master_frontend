import axiosClient from './axiosClient';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    avatarUrl?: string;
  };
}

const authApi = {
  login: (data: LoginRequest) =>
    axiosClient.post<AuthResponse>('/auth/login', data),

  register: (data: RegisterRequest) =>
    axiosClient.post<AuthResponse>('/auth/register', data),

  getMe: () =>
    axiosClient.get<AuthResponse['user']>('/auth/me'),
};

export default authApi;
