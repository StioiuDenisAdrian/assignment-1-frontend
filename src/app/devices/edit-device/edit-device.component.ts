import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'src/app/accounts/services/accounts.service';
import { DeviceModel } from '../models/device.model';
import { DeviceService } from '../services/device.service';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.scss']
})
export class EditDeviceComponent implements OnInit {

  public isClient: boolean;

  constructor(private readonly deviceService: DeviceService,
    public dialogRef: MatDialogRef<EditDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeviceModel,
    private readonly accountService: AccountService) { }

 
  ngOnInit(): void {
    this.isClient = this.accountService.isClient();
    if(this.data.id){
      this.deviceService.getDevice(this.data.id).subscribe(d => {
        this.data = d;
      })
    }
  }

  save(): void{
    this.deviceService.saveDevice(this.data).subscribe();
    this.dialogRef.close();
  }

  close(): void{
    this.dialogRef.close();
  } 

}
