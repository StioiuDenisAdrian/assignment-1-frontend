import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AccountService } from './accounts/services/accounts.service';
import { SignalRService } from './services/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy {
  title = 'energy-platform';

  

  constructor(public signalRService: SignalRService,
              public accountService: AccountService){

  }

  ngOnDestroy(): void {
    this.signalRService.hubConnection.off("askServerResponse");
  }

  ngOnInit(): void {
    if(this.accountService.isUserAuthenticated()){
      this.signalRService.startConnection();

      setTimeout(() =>{
          this.signalRService.askServerListener();
      }, 2000);
    }
  }
}
