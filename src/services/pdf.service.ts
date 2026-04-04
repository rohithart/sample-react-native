import { apiClient } from '@utils/apiClient';
import { ApiResponse, PDFDocument } from '@interfaces';

class PDFService {
  async generateFromTemplate(
    templateId: string,
    data: Record<string, any>
  ): Promise<ApiResponse<PDFDocument>> {
    return apiClient.post(`/pdf/generate/${templateId}`, data);
  }

  async generateFromHTML(html: string, fileName?: string): Promise<Blob> {
    const response = await apiClient.post(`/pdf/html-to-pdf`, { html, fileName }, {
      responseType: 'blob',
    });
    return response.data;
  }

  async merge(pdfUrls: string[], fileName?: string): Promise<Blob> {
    const response = await apiClient.post(`/pdf/merge`, { pdfUrls, fileName }, {
      responseType: 'blob',
    });
    return response.data;
  }

  async split(pdfUrl: string, pageRanges: string[]): Promise<string[]> {
    const response = await apiClient.post(`/pdf/split`, { pdfUrl, pageRanges });
    return response.data;
  }

  async extract(pdfUrl: string, options?: any): Promise<ApiResponse<Record<string, any>>> {
    return apiClient.post(`/pdf/extract`, { pdfUrl, options });
  }

  async addWatermark(pdfUrl: string, watermarkText: string): Promise<Blob> {
    const response = await apiClient.post(`/pdf/watermark`, { pdfUrl, watermarkText }, {
      responseType: 'blob',
    });
    return response.data;
  }

  async convertToImage(pdfUrl: string, format: 'png' | 'jpeg'): Promise<Blob> {
    const response = await apiClient.get(`/pdf/to-image/${encodeURIComponent(pdfUrl)}?format=${format}`, {
      responseType: 'blob',
    });
    return response.data;
  }
}

export const pdfService = new PDFService();
