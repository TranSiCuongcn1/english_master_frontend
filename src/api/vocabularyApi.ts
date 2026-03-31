import axiosClient from './axiosClient';
import type { VocabularyTopic } from '../types';

const vocabularyApi = {
  getTopics: () =>
    axiosClient.get<VocabularyTopic[]>('/vocabulary'),

  getTopicById: (id: string) =>
    axiosClient.get<VocabularyTopic>(`/vocabulary/${id}`),
};

export default vocabularyApi;
