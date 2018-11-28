import { Component, AfterContentInit, ViewContainerRef, ViewChild, Renderer, Renderer2 } from '@angular/core';
import { D3Service } from './d3/d3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  @ViewChild('firstQuarter', {read: ViewContainerRef}) firstQuarterRef: ViewContainerRef;
  @ViewChild('secondQuarter', {read: ViewContainerRef}) secondQuarterRef: ViewContainerRef;
  @ViewChild('thirdQuarter', {read: ViewContainerRef}) thirdQuarterRef: ViewContainerRef;
  @ViewChild('fourthQuarter', {read: ViewContainerRef}) fourthQuarterRef: ViewContainerRef;
  title = 'D3angular';

  sampleSales = [
    { label: 'Jan', value: 10 },
    { label: 'Feb', value: 20 },
    { label: 'Mar', value: 30 },
    { label: 'Apr', value: 40 },
    { label: 'May', value: 50 },
    { label: 'Jun', value: 20 },
    { label: 'Jul', value: 40 },
    { label: 'Aug', value: 30 },
    { label: 'Sep', value: 60 },
    { label: 'Oct', value: 80 },
    { label: 'Nov', value: 90 },
    { label: 'Dec', value: 20 }
  ];

  constructor(private readonly d3Service: D3Service) {
  }

  ngAfterContentInit() {
    this.draw();
  }

  clean() {
    this.d3Service.cleanQuadrants();
  }

  draw() {
    this.firstQuarterRef.clear();
    this.thirdQuarterRef.clear();
    this.d3Service.addLineChartComponent(this.sampleSales, this.firstQuarterRef);
    this.d3Service.addPieChartComponent(this.sampleSales, this.thirdQuarterRef);
  }
}
