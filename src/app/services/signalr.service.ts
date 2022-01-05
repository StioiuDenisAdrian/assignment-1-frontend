import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as signalR from '@aspnet/signalr';
import { NotificationComponent } from '../notification/notification/notification.component';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  hubConnection: signalR.HubConnection;

  constructor(public dialog: MatDialog) {}

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://assignment-1-backend-denis.herokuapp.com/toastr', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    var connection=this.hubConnection
      .start()
      .catch((err) => console.log('Error while starting connection: ' + err));
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
