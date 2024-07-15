import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { IngressEgress } from '../../models/ingress-egress.model';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: ``,
})
export class StatisticsComponent implements OnInit, OnDestroy {

  // Doughnut
  doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos' ];
  doughnutChartData: ChartConfiguration<'doughnut'>['data']['datasets'] = [{ data: [] },];


  ingress: number = 0;
  egress: number = 0;
  totalIngress: number = 0;
  totalEgress: number = 0;

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.select('ingressEgress')
      .subscribe( ({ items }) => {
        this.generateStatistics(items)
      } )
  }

  ngOnDestroy() {

  }

  generateStatistics( items: IngressEgress[] ) {

    this.totalIngress = 0;
    this.totalEgress = 0;
    this.ingress = 0;
    this.egress = 0;

    items.forEach( item => {

      if (item.type === 'ingress') {

        this.totalIngress += item.amount;
        this.ingress++

      } else {

        this.totalEgress += item.amount;
        this.egress++
      }
    })

    this.doughnutChartData = [{ data: [this.totalIngress, this.totalEgress] }]

  }

}
