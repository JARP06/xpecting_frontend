import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  allSymptomsLogged(): Observable<ApiResponse<SymptomLog[]>> {
    return this._http.get<ApiResponse<SymptomLog[]>>(this.API_URL_SYMPTOM_LOG).pipe(
      map(res => res)
    );
  }

  getOneSymptomLogged(slId: number): Observable<ApiResponse<SymptomLog>> {
    return this._http.get<ApiResponse<SymptomLog>>(`${this.API_URL_SYMPTOM_LOG}${slId}`).pipe(
      map(res => res)
    );
  }

  addToSymptomLog(data: SymptomLog): Observable<ApiResponse<SymptomLog>> {
    return this._http.post<ApiResponse<SymptomLog>>(this.API_URL_SYMPTOM_LOG, data).pipe(
      map(res => res)
    );
  }

  editSymptomLogged(data: SymptomLog, slId: number): Observable<ApiResponse<SymptomLog>> {
    return this._http.patch<ApiResponse<SymptomLog>>(`${this.API_URL_SYMPTOM_LOG}${slId}`, data).pipe(
      map(res => res)
    );
  }

  deleteSymptomLog(slId: number): Observable<ApiResponse<void>> {
    return this._http.delete<ApiResponse<void>>(`${this.API_URL_SYMPTOM_LOG}${slId}`).pipe(
      map(res => res)
    );
  }

  getLastSymptomLog(): Observable<{ data: SymptomLog }> {
    return this._http.get<{ data: SymptomLog }>(`${this.API_URL_SYMPTOM_LOG}most-recent-logged`);
  }
}
