import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Appointment } from '../models/appointment';
import { ApiResponse } from '../models/api-response';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private API_URL_APPOINTMENTS='http://localhost:8566/api/v1/xpecting/appointment/';

  constructor(private _http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  allAppointments(): Observable<any> {
    return this._http.get<any>(this.API_URL_APPOINTMENTS, { headers: this.getHeaders() }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  allAppointments2(): Observable<ApiResponse<Appointment[]>> {
    return this._http.get<ApiResponse<Appointment[]>>(this.API_URL_APPOINTMENTS, { headers: this.getHeaders() }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getOneAppointment(aId: number): Observable<ApiResponse<Appointment[]>> {
    return this._http.get<ApiResponse<Appointment[]>>(this.API_URL_APPOINTMENTS + aId, { headers: this.getHeaders() }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  addAppointment(data: any): Observable<ApiResponse<Appointment[]>> {
    return this._http.post<ApiResponse<Appointment[]>>(this.API_URL_APPOINTMENTS, data, { headers: this.getHeaders() }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  editAppointment(data: any, aId: number): Observable<ApiResponse<Appointment[]>> {
    return this._http.patch<ApiResponse<Appointment[]>>(`${this.API_URL_APPOINTMENTS}${aId}`, data, { headers: this.getHeaders() }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getUpcomingAppointment(): Observable<{ data: Appointment }> {
    return this._http.get<{ data: Appointment }>(`${this.API_URL_APPOINTMENTS}upcoming-appointment`, { headers: this.getHeaders() });
  }

  deleteAppointment(aId: number): Observable<ApiResponse<Appointment[]>> {
    return this._http.delete<ApiResponse<Appointment[]>>(`${this.API_URL_APPOINTMENTS}${aId}`, { headers: this.getHeaders() }).pipe(
      map((res) => {
        return res;
      })
    );
}
}
