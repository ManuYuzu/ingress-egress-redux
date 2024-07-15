import { Component, Input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-graphics',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './graphics.component.html',
  styles: ``
})
export class GraphicsComponent {
// Doughnut
  @Input() doughnutChartLabels: string[] = [];
  @Input() doughnutChartData: ChartConfiguration<'doughnut'>['data']['datasets'] = [{ data: [] }];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };

  constructor() {}
}
