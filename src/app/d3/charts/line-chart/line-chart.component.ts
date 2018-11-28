import { Component, OnInit, Input } from '@angular/core';
import { MonthlySales } from '../../models/monthly-sales';
import { IData } from '../../models/data.interface';
import * as d3 from 'd3';
import { ChartBase } from '../chart.base.component';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent extends ChartBase {
  @Input() class: String;

  constructor() {
    super();
  }

  draw(sales: IData[]) {
    const svg = d3.select(`#lineChart`);
    const svgWidth = (svg.node() as SVGElement).getBoundingClientRect().width;
    const svgHeight = (svg.node() as SVGElement).getBoundingClientRect().height;
    const margin = { top: 20, right: 40, bottom: 20, left: 20 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const x = d3.scaleLinear().rangeRound([0, width]);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    const line = d3.line<MonthlySales>()
      .x((d, i) => x(i + 1))
      .y(d => y(d.value))
      .curve(d3.curveLinear);

    x.domain(d3.extent(sales, (d, i) => i + 1));
    y.domain(d3.extent(sales, d => d.value));

    g.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .append('text')
      .attr('fill', '#000')
      .attr('x', width)
      .attr('y', -5)
      .attr('dx', '0.71em')
      .attr('text-anchor', 'end')
      .text('Month');

    g.append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Sales ($)');

    g.append('path')
      .datum(sales)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line);

    const div = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    g.selectAll('dot')
      .data(sales)
      .enter()
      .append('circle')
      .attr('r', 5)
      .style('opacity', 0.7)
      .attr('cx', function(d, i) { return x(i + 1); })
      .attr('cy', function(d) { return y(d.value); })
      .on('mouseenter', function(d) {
          div.transition()
              .duration(1)
              .style('opacity', 1);
          div.html(d.label + '<br/>'  + d.value)
              .style('left', (d3.event.pageX + 10) + 'px')
              .style('top', (d3.event.pageY - 28) + 'px');
          })
      .on('mouseout', function(d) {
          div.transition()
              .duration(1)
              .style('opacity', 0);
      });
  }

}
