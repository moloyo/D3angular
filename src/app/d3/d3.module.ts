import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D3Service } from './d3.service';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [D3Service],
  declarations: [PieChartComponent, LineChartComponent],
  entryComponents: [
    PieChartComponent,
    LineChartComponent
  ],
  exports: [
    PieChartComponent
  ]
})
export class D3Module { }
