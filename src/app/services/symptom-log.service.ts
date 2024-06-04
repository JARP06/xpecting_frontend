import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response';
import { SymptomLog } from '../models/symptom-log';

@Injectable({
  providedIn: 'root'
})
export class SymptomLogService {
  private readonly API_URL_SYMPTOM_LOG = 'http://localhost:8566/api/v1/xpecting/symptoms-tracker/';

  constructor(private _http: HttpClient) {}

  // Function to get HTTP headers with authorization token
  private getHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('authToken'); // Retrieve authentication token from local storage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}` // Set Authorization header with the token
    });
  }

  allSymptomsLogged(): Observable<ApiResponse<SymptomLog[]>> {
    const headers = this.getHeaders(); // Get headers with authorization token
    return this._http.get<ApiResponse<SymptomLog[]>>(this.API_URL_SYMPTOM_LOG, { headers }).pipe(
      map(res => res)
    );
  }

  getOneSymptomLogged(slId: number): Observable<ApiResponse<SymptomLog>> {
    const headers = this.getHeaders(); // Get headers with authorization token
    return this._http.get<ApiResponse<SymptomLog>>(`${this.API_URL_SYMPTOM_LOG}symptoms/log/${slId}`, { headers }).pipe(
      map(res => res)
    );
  }

  addToSymptomLog(data: SymptomLog): Observable<ApiResponse<SymptomLog>> {
    const headers = this.getHeaders(); // Get headers with authorization token
    return this._http.post<ApiResponse<SymptomLog>>(this.API_URL_SYMPTOM_LOG, data, { headers }).pipe(
      map(res => res)
    );
  }

  editSymptomLogged(data: SymptomLog, slId: number): Observable<ApiResponse<SymptomLog>> {
    const headers = this.getHeaders(); // Get headers with authorization token
    return this._http.put<ApiResponse<SymptomLog>>(`${this.API_URL_SYMPTOM_LOG}symptoms/log/${slId}`, data, { headers }).pipe(
      map(res => res)
    );
  }

  deleteSymptomLog(slId: number): Observable<ApiResponse<void>> {
    const headers = this.getHeaders(); // Get headers with authorization token
    return this._http.delete<ApiResponse<void>>(`${this.API_URL_SYMPTOM_LOG}symptoms/log/${slId}`, { headers }).pipe(
      map(res => res)
    );
  }

  getLastSymptomLog(): Observable<{ data: SymptomLog }> {
    const headers = this.getHeaders(); // Get headers with authorization token
    return this._http.get<{ data: SymptomLog }>(`${this.API_URL_SYMPTOM_LOG}symptoms/most-recent`, { headers });
  }
}
