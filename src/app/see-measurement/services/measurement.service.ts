import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MeasurementModel } from '../models/measurement.model';

@Injectable({
  providedIn: 'root',
})
export class MeasurementService {
  private source: string = 'https://assignment-1-backend-denis.herokuapp.com/api';

  constructor(private http: HttpClient) {}

  public getMeasurements(
    deviceId: string,
    timeStamp: string
  ): Observable<any> {
    return this.http.post<any>(
      this.source +
        '/measurements/GetMeasurements/' +
        deviceId ,
        timeStamp
    );
  }
}
