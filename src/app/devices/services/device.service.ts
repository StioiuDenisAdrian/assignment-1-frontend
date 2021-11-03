import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/accounts/models/user.model';
import { DeviceData } from '../models/device.data';
import { DeviceModel } from '../models/device.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private source: string = 'https://assignment-1-backend-denis.herokuapp.com/api';

  constructor(private http: HttpClient) {}

  public deleteDevice(id: string): Observable<any> {
    return this.http.delete(this.source + '/devices/DeleteDevice/' + id);
  }

  public getDevice(id: string): Observable<any> {
    return this.http.get<DeviceModel>(this.source + '/devices/GetDevice/' + id);
  }

  public getDevices(userId: string): Observable<any> {
    return this.http.get<DeviceData[]>(
      this.source + '/devices/GetDevices/' + userId
    );
  }

  public updateDevice(deviceModel: DeviceModel): Observable<any> {
    return this.http.put<UserModel>(
      this.source + '/devices/UpdateDevice',
      deviceModel
    );
  }

  public saveDevice(deviceModel: DeviceModel): Observable<any> {
    return this.http.post<DeviceModel>(
      this.source + '/devices/SaveDevice',
      deviceModel
    );
  }
}
