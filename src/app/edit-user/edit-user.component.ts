import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from '../accounts/models/user.model';
import { AccountService } from '../accounts/services/accounts.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor(private readonly accountService: AccountService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModel,
    ) { }

  ngOnInit(): void {
  }

  save(): void{
    this.accountService.saveUser(this.data).subscribe();
    this.dialogRef.close();
  }

  close(): void{
    this.dialogRef.close();
  } 

}
