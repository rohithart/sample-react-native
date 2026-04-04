import { apiClient } from '@utils/apiClient';
import { ApiResponse, Vote, Poll } from '@interfaces';

class VoteService {
  async getAll(orgId: string): Promise<ApiResponse<Vote[]>> {
    return apiClient.get(`/vote/org/${orgId}`);
  }

  async getForPoll(pollId: string): Promise<ApiResponse<Vote[]>> {
    return apiClient.get(`/vote/poll/${pollId}`);
  }

  async get(id: string): Promise<ApiResponse<Vote>> {
    return apiClient.get(`/vote/${id}`);
  }

  async vote(pollId: string, optionId: string): Promise<ApiResponse<Vote>> {
    return apiClient.post(`/vote/poll/${pollId}`, { optionId });
  }

  async removeVote(id: string): Promise<ApiResponse<boolean>> {
    return apiClient.delete(`/vote/${id}`);
  }

  async getResults(pollId: string): Promise<ApiResponse<Record<string, number>>> {
    return apiClient.get(`/vote/results/${pollId}`);
  }
}

export const voteService = new VoteService();
