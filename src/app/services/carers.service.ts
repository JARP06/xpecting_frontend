import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Appointment } from '../models/appointment';
import { ApiResponse } from '../models/api-response';
@Injectable({
  providedIn: 'root'
})
export class CarersService {


  private API_URL_CARERS='http://localhost:8566/api/v1/xpecting/carers/';

  constructor(private _http: HttpClient) {}

  /**
   * This function will the post route in the api to add a new appointment to the database
   * @param data Object - data collected from form fields
   * @returns Response from the api
   */

  getAllCarer(): Observable<ApiResponse<any>> {
    return this._http.get<ApiResponse<any>>(this.API_URL_CARERS).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
