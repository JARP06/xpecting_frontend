import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../models/api-response';
@Injectable({
  providedIn: 'root'
})
export class SymptomsService {


  private API_URL_SYMPTOMS='http://localhost:8566/api/v1/xpecting/symptoms/';

  constructor(private _http: HttpClient) {}

  /**
   * 
   * @param data 
   * @returns 
   */

  getAllSymptoms(): Observable<ApiResponse<any>> {
    return this._http.get<ApiResponse<any>>(this.API_URL_SYMPTOMS).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
