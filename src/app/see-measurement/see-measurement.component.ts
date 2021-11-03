import {
  Component,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeasurementModel } from './models/measurement.model';
import { MeasurementService } from './services/measurement.service';
import { ChartDataset, ChartOptions } from 'chart.js';
import { Colors, Label } from 'ng2-charts';

@Component({
  selector: 'app-see-measurement',
  templateUrl: './see-measurement.component.html',
  styleUrls: ['./see-measurement.component.scss'],
})
export class SeeMeasurementComponent implements OnInit {
  public timeStamp: string;

  public lineChartData: ChartDataset[]=[{data:[], label: 'Historical consumption'}];;
  public lineChartLabels: Label[]=[];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
  };
  public lineChartColors: any[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  constructor(
    private readonly measurementService: MeasurementService,
    public dialogRef: MatDialogRef<SeeMeasurementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}


  ngOnInit(): void {}

  seeMeasurements(): void {
    var values: number[] = [];
    var labels: string[] = [];
    this.measurementService
      .getMeasurements(this.data, this.timeStamp)
      .subscribe((measurments) => {
        console.log(measurments);
        for(let measurement of measurments){
          values.push(measurement.kwh);
          labels.push(measurement.timeStamp);
        }
        this.lineChartData = [{data:values, label: 'Historical consumption'}];
        this.lineChartLabels = labels;
        console.log(this.lineChartData);
      });

  }

  close(): void {
    this.dialogRef.close();
  }
}
