import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { File } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class VendorSubmitService {
  private readonly http = inject(HttpClient);
  private apiUrl = `${environment.api_url}/vendor-submit`;

  getEvidenceForVendor(id: string, body: any): any {
    return this.http.patch<any>(`${this.apiUrl}/evidence/${id}`, body);
  }

  getEvidenceFileForVendor(id: string): any {
    return this.http.get<any>(`${this.apiUrl}/evidence/files/${id}`);
  }
  getEvidenceImagesForVendor(id: string): any {
    return this.http.get<any>(`${this.apiUrl}/evidence/images/${id}`);
  }

  getEvidenceCommentForVendor(id: string): any {
    return this.http.get<any>(`${this.apiUrl}/evidence/comment/${id}`);
  }

  updateEvidence(id: string, body: any): any {
    return this.http.post<any>(`${this.apiUrl}/evidence/${id}`, body);
  }

  uploadVendorEvidenceFile(orgId: string, id: string, data: any) {
    return this.http.post<File>(`${this.apiUrl}/evidence/file/${orgId}/${id}`, data);
  }

  uploadVendorEvidenceImage(orgId: string, id: string, data: any) {
    return this.http.post<File>(`${this.apiUrl}/evidence/image/${orgId}/${id}`, data);
  }

  getQuoteForVendor(id: string, body: any): any {
    return this.http.patch<any>(`${this.apiUrl}/quote/${id}`, body);
  }

  getQuoteFileForVendor(id: string): any {
    return this.http.get<any>(`${this.apiUrl}/quote/files/${id}`);
  }

  getQuoteCommentForVendor(id: string): any {
    return this.http.get<any>(`${this.apiUrl}/quote/comment/${id}`);
  }

  updateQuote(id: string, body: any): any {
    return this.http.post<any>(`${this.apiUrl}/quote/${id}`, body);
  }

  submitQuote(id: string, body: any): any {
    return this.http.post<any>(`${this.apiUrl}/quote/submit/${id}`, body);
  }

  uploadVendorQuoteFile(orgId: string, id: string, data: any) {
    return this.http.post<File>(`${this.apiUrl}/quote/file/${orgId}/${id}`, data);
  }

  getInvoiceForVendor(id: string, body: any): any {
    return this.http.patch<any>(`${this.apiUrl}/invoice/${id}`, body);
  }

  getInvoiceFileForVendor(id: string): any {
    return this.http.get<any>(`${this.apiUrl}/invoice/files/${id}`);
  }

  getInvoiceCommentForVendor(id: string): any {
    return this.http.get<any>(`${this.apiUrl}/invoice/comment/${id}`);
  }

  updateInvoice(id: string, body: any): any {
    return this.http.post<any>(`${this.apiUrl}/invoice/${id}`, body);
  }

  submitInvoice(id: string, body: any): any {
    return this.http.post<any>(`${this.apiUrl}/invoice/submit/${id}`, body);
  }

  uploadVendorInvoiceFile(orgId: string, id: string, data: any) {
    return this.http.post<File>(`${this.apiUrl}/invoice/file/${orgId}/${id}`, data);
  }

  getWorkorderForVendor(id: string, body: any): any {
    return this.http.patch<any>(`${this.apiUrl}/workorder/${id}`, body);
  }

  getWorkorderFileForVendor(id: string): any {
    return this.http.get<any>(`${this.apiUrl}/workorder/files/${id}`);
  }

  getWorkorderCommentForVendor(id: string): any {
    return this.http.get<any>(`${this.apiUrl}/workorder/comment/${id}`);
  }

  updateWorkorder(id: string, body: any): any {
    return this.http.post<any>(`${this.apiUrl}/workorder/${id}`, body);
  }

  submitWorkorder(id: string, body: any): any {
    return this.http.post<any>(`${this.apiUrl}/workorder/submit/${id}`, body);
  }

  uploadVendorWorkorderFile(orgId: string, id: string, data: any) {
    return this.http.post<File>(`${this.apiUrl}/workorder/file/${orgId}/${id}`, data);
  }

  createComment(id: string, data: any) {
    return this.http.post<File>(`${this.apiUrl}/comment/${id}`, data);
  }
}
