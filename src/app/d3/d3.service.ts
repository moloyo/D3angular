import { Injectable, ComponentFactoryResolver, ViewContainerRef, Renderer2, RendererFactory2 } from '@angular/core';
import * as d3 from 'd3';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { IData } from './models/data.interface';

@Injectable({
  providedIn: 'root',
})
export class D3Service {
  private renderer: Renderer2;

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver, private readonly renderFactory: RendererFactory2) {
    this.renderer = renderFactory.createRenderer(null, null);
  }

  addPieChartComponent(data: IData[], viewContainerRef: ViewContainerRef) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(PieChartComponent);
    const component = viewContainerRef.createComponent(factory);
    this.renderer.addClass(component.location.nativeElement, 'col-sm-6');
    component.instance.draw(data);
  }

  addLineChartComponent(data: IData[], viewContainerRef: ViewContainerRef) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(LineChartComponent);
    const component = viewContainerRef.createComponent(factory);
    this.renderer.addClass(component.location.nativeElement, 'col-sm-6');
    component.instance.draw(data);
  }

  cleanQuadrants() {
    const svg = d3.selectAll(`svg > *`);
    svg.remove();
  }
}
