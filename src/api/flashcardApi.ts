import axiosClient from './axiosClient';
import type { Flashcard } from '../types';

export interface CreateFlashcardRequest {
  front: string;
  back: string;
  example?: string;
  category?: string;
}

const flashcardApi = {
  getAll: () =>
    axiosClient.get<Flashcard[]>('/flashcards'),

  create: (data: CreateFlashcardRequest) =>
    axiosClient.post<Flashcard>('/flashcards', data),

  delete: (id: string) =>
    axiosClient.delete(`/flashcards/${id}`),
};

export default flashcardApi;
