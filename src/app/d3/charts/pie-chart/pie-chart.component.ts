import { Component, OnInit } from '@angular/core';
import * as d3pie from 'd3pie';
import { MonthlySales } from '../../models/monthly-sales';
import * as d3 from 'd3';
import { ChartBase } from '../chart.base.component';
import { IData } from '../../models/data.interface';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent extends ChartBase {

  constructor() {
    super();
  }

  draw(data: IData[]) {
    const svg = d3.select(`#pieChart`);
    const svgWidth = (svg.node() as SVGElement).getBoundingClientRect().width;
    const svgHeight = (svg.node() as SVGElement).getBoundingClientRect().height;
    const margin = { top: 20, right: 40, bottom: 20, left: 20 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const pie = new d3pie('pieChart', {
      'header': {
        'title': {
          'text': 'TITLE',
          'fontSize': 22,
          'font': 'verdana'
        },
        // 'subtitle': {
        //   'text': 'SUBTITLE',
        //   'color': '#999999',
        //   'fontSize': 10,
        //   'font': 'verdana'
        // },
        // 'titleSubtitlePadding': 12
      },
      // 'footer': {
      //   'text': 'FOOTER',
      //   'color': '#999999',
      //   'fontSize': 11,
      //   'font': 'open sans',
      //   'location': 'bottom-center'
      // },
      'size': {
        'canvasHeight': height,
        'canvasWidth': width,
        'pieOuterRadius': '100%'
      },
      'data': {
        'content': data
      },
      'labels': {
        'outer': {
          'pieDistance': 20
        },
        'inner': {
          'format': 'percentage'
        },
        'mainLabel': {
          'font': 'verdana'
        },
        'percentage': {
          'color': '#e1e1e1',
          'font': 'verdana',
          'decimalPlaces': 0
        },
        'value': {
          'color': '#e1e1e1',
          'font': 'verdana'
        },
        'truncation': {
          'enabled': true
        }
      },
      'effects': {
        'pullOutSegmentOnClick': {
          'effect': 'none',
          'speed': 400,
          'size': 8
        }
      },
      'callbacks': {
        onClickSegment: (segment: any) => {
          alert(JSON.stringify(segment.data));
        }
      }
    });
  }

}
