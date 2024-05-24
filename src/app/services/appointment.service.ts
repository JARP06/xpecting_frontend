import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Appointment } from '../models/appointment';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private API_URL_APPOINTMENTS='http://localhost:8566/api/v1/xpecting/appointment/';

  constructor(private _http: HttpClient) {}

  /**
   * Get all Appointment
   * @returns
   */

  allAppointments(): Observable<any> {
    return this._http.get<any>(this.API_URL_APPOINTMENTS).pipe(
      map((res) => {
        return res;
      })
    );
  }

  allAppointments2(): Observable<ApiResponse<Appointment[]>> {
    return this._http.get<ApiResponse<Appointment[]>>(this.API_URL_APPOINTMENTS).pipe(
      map((res) => {
        return res;
      })
    );

      /**
   * This function will call on the get request on the api to get a single appointment.
   * @param aId Id for the appointment user select.
   * @returns Response from the api with data of selected appointment of message.
   */

  }
  getOneAppointment(aId:number): Observable<ApiResponse<Appointment[]>>{
    return this._http.get<ApiResponse<Appointment[]>>(this.API_URL_APPOINTMENTS + aId).pipe(
      map((res) => {
        return res
      })
    )
  }

  /**
   * This function will the post route in the api to add a new appointment to the database
   * @param data Object - data collected from form fields
   * @returns Response from the api
   */

addAppointment(data:any): Observable<ApiResponse<Appointment[]>>{
  return this._http.post<ApiResponse<Appointment[]>>(this.API_URL_APPOINTMENTS, data).pipe(
    map((res) => {
      return res
    })
  )
}

  /**
   * This function will call on the edit appointment request on the api to edit a single appointment.
   * @param data Object - data collected from form fields
   * @param aId Number - Id for record to be updated
   * @returns Response from the api
   */

  editAppointment(data: any, aId: number): Observable<ApiResponse<Appointment[]>> {
    return this._http.patch<ApiResponse<Appointment[]>>(`${this.API_URL_APPOINTMENTS}${aId}`, data).pipe(
      map((res) => {
        return res;
      })
    );
  }
  
  getUpcomingAppointment(): Observable<{ data: Appointment }> {
    return this._http.get<{ data: Appointment }>(`${this.API_URL_APPOINTMENTS}upcoming-appointment`);
  }

}