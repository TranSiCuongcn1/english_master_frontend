import axiosClient from './axiosClient';
import type { LeaderboardEntry } from '../types';

const leaderboardApi = {
  getAll: () =>
    axiosClient.get<LeaderboardEntry[]>('/leaderboard'),
};

export default leaderboardApi;
