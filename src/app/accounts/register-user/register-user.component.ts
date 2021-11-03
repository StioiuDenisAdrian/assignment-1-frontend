import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserRegistration } from '../models/user-registration.model';
import { AccountService } from '../services/accounts.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {
  public userRegistration: UserRegistration = new UserRegistration();

  constructor(
    private readonly authenticationService: AccountService,
    public dialogRef: MatDialogRef<RegisterUserComponent>
  ) {}
  ngOnInit(): void {}

  register() {
    this.authenticationService
      .registerUser(this.userRegistration)
      .subscribe(() => {});
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
