import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignalRService } from '../services/signalr.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Colors, Label } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-historical-consumption',
  templateUrl: './historical-consumption.component.html',
  styleUrls: ['./historical-consumption.component.scss'],
})
export class HistoricalConsumptionComponent implements OnInit {
  deviceId: string;
  numberOfDays: number = 7;
  values: number[] = [];
  labels: string[] = [];

  valuesBaseline: number[] = [];
  labelsBaseline: string[] = [];

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Historical consumption' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Colors[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  public lineChartDataBaseline: ChartDataSets[] = [
    { data: [], label: 'Baseline consumption' },
  ];
  public lineChartLabelsBaseline: Label[] = [];
  public lineChartOptionsBaseline: ChartOptions = {
    responsive: true,
  };
  public lineChartColorsBaseline: Colors[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(0,255,0,0.3)',
    },
  ];
  public lineChartLegendBaseline = true;
  public lineChartTypeBaseline = 'line';
  public lineChartPluginsBaseline = [];

  constructor(
    private route: ActivatedRoute,
    public signalRService: SignalRService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((p) => {
      this.deviceId = p['deviceId'];
    });

    this.signalRService.sendDeviceIdAndDays(this.deviceId, 7);
    this.signalRService.sendDeviceIdAndDaysForBaselineConsumption(
      this.deviceId,
      7
    );

    setTimeout(() => {
      this.signalRService.hubConnection.on('consumptionOverDays', (data) => {
        for (let measurement of data) {
          this.values.push(measurement.kwh);
          this.labels.push(measurement.timeStamp);
        }
        this.lineChartData = [
          { data: this.values, label: 'Historical weekly consumption' },
        ];
        this.lineChartLabels = this.labels;
      });

      this.signalRService.hubConnection.on('baseLineConsumption', (data) => {
        for (let measurement of data) {
          this.valuesBaseline.push(measurement.kwh);
          this.labelsBaseline.push(measurement.hour);
        }
        this.lineChartDataBaseline = [
          { data: this.valuesBaseline, label: 'Baseline weekly consumption' },
        ];
        this.lineChartLabelsBaseline = this.labelsBaseline;
      });
    }, 2000);
  }

  sendData() {
    this.values = [];
    this.labels = [];

    this.valuesBaseline = [];
    this.labelsBaseline = [];

    this.signalRService.sendDeviceIdAndDays(
      this.deviceId,
      this.numberOfDays
    );
    this.signalRService.sendDeviceIdAndDaysForBaselineConsumption(
      this.deviceId,
      this.numberOfDays 
    );
  }
}
