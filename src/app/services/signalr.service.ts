import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as signalR from '@aspnet/signalr';
import { NotificationComponent } from '../notification/notification/notification.component';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  hubConnection: signalR.HubConnection;
   deploy = 'https://assignment-1-backend-denis.herokuapp.com/toastr';
  constructor(public dialog: MatDialog) {}

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.deploy, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    var connection=this.hubConnection
      .start()
      .catch((err) => console.log('Error while starting connection: ' + err));
  }

  public stopConnection(methodName: string){
    this.hubConnection.off(methodName);
  }

  public sendDeviceIdAndDays(deviceId: string, numberOfDays: number){
    this.hubConnection.invoke("GetConsumptionOverDays",deviceId,numberOfDays).catch(err => console.log(err));
  }

  public sendDeviceIdAndDaysForBaselineConsumption(deviceId: string, numberOfDays: number){
    this.hubConnection.invoke("GetBaselineConsumption",deviceId,numberOfDays).catch(err => console.log(err));
  }

  public getMeasuremtsOverDays(){
    var measurments;
    this.hubConnection.on("consumptionOverDays", (data) =>{
      measurments = data;
    })
    return measurments;
  }

  askServerListener(){
      this.hubConnection.on("maximumValueExcedeed", (notification) =>{
          if(localStorage.getItem('userName') === notification.userName){
            const dialogRef = this.dialog.open(NotificationComponent, {
              width: '300px',
              data: notification.message
            });
          }
      })
  }
}
