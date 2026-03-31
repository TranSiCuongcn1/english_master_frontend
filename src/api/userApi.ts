import axiosClient from './axiosClient';

export interface UpdateProfileRequest {
  name: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

const userApi = {
  updateProfile: (data: UpdateProfileRequest) =>
    axiosClient.put('/users/me', data),

  changePassword: (data: ChangePasswordRequest) =>
    axiosClient.put('/users/me/password', data),

  deleteAccount: () =>
    axiosClient.delete('/users/me'),
};

export default userApi;
