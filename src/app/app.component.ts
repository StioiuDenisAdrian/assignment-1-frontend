import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AccountService } from './accounts/services/accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'energy-platform';

  

  constructor(){

  }
}
