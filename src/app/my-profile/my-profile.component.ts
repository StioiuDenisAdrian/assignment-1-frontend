import { Component, OnInit } from '@angular/core';
import { UserModel } from '../accounts/models/user.model';
import { AccountService } from '../accounts/services/accounts.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  public user: UserModel = new UserModel();

  constructor(private readonly accountService: AccountService) { }

  ngOnInit(): void {
    
    this.accountService.getCurrentUser(localStorage.getItem('userName')?.toString()).subscribe(u =>{
      this.user = u;
    })
  }

}
