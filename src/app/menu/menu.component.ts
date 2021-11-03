import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../accounts/services/accounts.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public isManager: boolean = false;
  public isClient: boolean = false;
  public isAuthenticated: boolean = false;

  constructor(
    private readonly accountService: AccountService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.isClient = this.accountService.isClient();
    this.isManager = this.accountService.isUserManager();
    this.isAuthenticated = this.accountService.isUserAuthenticated();
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/login').then(() => {
      window.location.reload();
    });
  }

  navigateToMyProfile() {
    this.router.navigateByUrl('/my-profile');
  }

  navigateToUsersDashboard() {
    this.router.navigateByUrl('/users');
  }

  navigateToMyDevices(){
    this.router.navigateByUrl('/my-devices');
  }
}
