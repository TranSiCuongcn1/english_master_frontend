import axiosClient from './axiosClient';
import type { GrammarTopic } from '../types';

const grammarApi = {
  getTopics: () =>
    axiosClient.get<GrammarTopic[]>('/grammar'),

  getTopicById: (id: string) =>
    axiosClient.get<GrammarTopic>(`/grammar/${id}`),
};

export default grammarApi;
