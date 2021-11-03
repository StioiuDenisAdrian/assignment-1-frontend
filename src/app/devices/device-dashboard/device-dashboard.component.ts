import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from 'src/app/accounts/models/user.model';
import { AccountService } from 'src/app/accounts/services/accounts.service';
import { SeeMeasurementComponent } from 'src/app/see-measurement/see-measurement.component';
import { EditDeviceComponent } from '../edit-device/edit-device.component';
import { DeviceData } from '../models/device.data';
import { DeviceModel } from '../models/device.model';
import { DeviceService } from '../services/device.service';

@Component({
  selector: 'app-device-dashboard',
  templateUrl: './device-dashboard.component.html',
  styleUrls: ['./device-dashboard.component.scss'],
})
export class DeviceDashboardComponent implements OnInit,AfterViewInit {

  @Input() userId: string;

  public isClient: boolean = false;
  public dataSource: MatTableDataSource<DeviceData> =
    new MatTableDataSource<DeviceData>();
  displayedColumns: string[] = [
    'deviceName',
    'maximumValue',
    'delete',
    'edit',
    'add',
  ];
  displayedColumnsForClient: string[] =[
    'deviceName',
    'maximumValue',
    'edit',
    'seeMeasurements'
  ]
  userData: any;
  length: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  

  constructor(
    private readonly deviceService: DeviceService,
    private readonly accountService: AccountService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isClient = this.accountService.isClient();
    if(this.userId){
      this.deviceService.getDevices(this.userId).subscribe(d =>{
        this.dataSource = new MatTableDataSource(d);
        this.length = this.dataSource.data.length;
      });
    }else{
      var currentUser: UserModel = new UserModel();
      this.accountService.getCurrentUser(localStorage.getItem('userName')?.toString()).subscribe(u =>{
        this.deviceService.getDevices(u.id).subscribe(d =>{
          this.dataSource = new MatTableDataSource(d);
          this.length = this.dataSource.data.length;
        });
      });
      
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteDevice(id: string): void {
    this.deviceService.deleteDevice(id).subscribe();
    window.location.reload();
  }
  editDevice(id:string): void { 
    const dialogRef = this.dialog.open(EditDeviceComponent, {
    width: '350px',
    data:{ userId: this.userId, id:id}
  });
  dialogRef.afterClosed().subscribe((r) => {
    if(this.userId){
      this.deviceService.getDevices(this.userId).subscribe(d =>{
        this.dataSource = new MatTableDataSource(d);
        this.length = this.dataSource.data.length;
      });
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });}

  addDevice(): void{
    const dialogRef = this.dialog.open(EditDeviceComponent, {
      width: '350px',
      data:{ userId: this.userId}
    });
    dialogRef.afterClosed().subscribe((r) => {
      if(this.userId){
        this.deviceService.getDevices(this.userId).subscribe(d =>{
          this.dataSource = new MatTableDataSource(d);
          this.length = this.dataSource.data.length;
        });
      }
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  seeMeasurements(deviceId: string): void{
    const dialogRef = this.dialog.open(SeeMeasurementComponent, {
      width: '700px',
      data: deviceId
    });
  }
}