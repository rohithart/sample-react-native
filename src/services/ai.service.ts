import { apiClient } from '@utils/apiClient';
import { ApiResponse, AIRequest } from '@interfaces';

class AIService {
  async prompt(orgId: string, prompt: string, model: string = 'gpt-3.5'): Promise<ApiResponse<AIRequest>> {
    return apiClient.post(`/ai/prompt/${orgId}`, { prompt, model });
  }

  async generateText(
    orgId: string,
    template: string,
    variables: Record<string, any>
  ): Promise<ApiResponse<string>> {
    return apiClient.post(`/ai/generate-text/${orgId}`, { template, variables });
  }

  async summarize(orgId: string, text: string, maxLength?: number): Promise<ApiResponse<string>> {
    return apiClient.post(`/ai/summarize/${orgId}`, { text, maxLength });
  }

  async analyzeImage(orgId: string, imageUrl: string, query?: string): Promise<ApiResponse<string>> {
    return apiClient.post(`/ai/analyze-image/${orgId}`, { imageUrl, query });
  }

  async translateText(
    orgId: string,
    text: string,
    targetLanguage: string
  ): Promise<ApiResponse<string>> {
    return apiClient.post(`/ai/translate/${orgId}`, { text, targetLanguage });
  }

  async extractEntities(orgId: string, text: string): Promise<ApiResponse<Record<string, any>>> {
    return apiClient.post(`/ai/extract-entities/${orgId}`, { text });
  }

  async classifyText(orgId: string, text: string): Promise<ApiResponse<{ category: string; confidence: number }>> {
    return apiClient.post(`/ai/classify/${orgId}`, { text });
  }

  async getRequest(id: string): Promise<ApiResponse<AIRequest>> {
    return apiClient.get(`/ai/request/${id}`);
  }

  async getRequests(orgId: string): Promise<ApiResponse<AIRequest[]>> {
    return apiClient.get(`/ai/requests/${orgId}`);
  }
}

export const aiService = new AIService();
