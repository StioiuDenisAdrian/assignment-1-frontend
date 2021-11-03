import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthentication } from '../models/user-authentication.model';
import { AccountService } from '../services/accounts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public errorMessage: string;
  public credentials: UserAuthentication = new UserAuthentication();

  constructor(
    private readonly accountService: AccountService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.errorMessage = '';
  }

  login(): void {
    this.accountService.login(this.credentials).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userName', this.credentials.userName);
        this.accountService.sendAuthStateChangeNotification(
          res.isAuthSuccessful
        );
        this.router.navigateByUrl('/my-profile').then(() => {
          window.location.reload();
        });
      },
      (err) => {
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
}
