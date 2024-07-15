import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// Modules
import { SharedModule } from '../shared/shared.module';
// Pipes
import { IngressEgressOrderPipe } from '../pipes/ingress-egress-order.pipe';
// Components
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngressEgressComponent } from './ingress-egress.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DetailComponent } from './detail/detail.component';
import { GraphicsComponent } from './statistics/graphics/graphics.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { StoreModule } from '@ngrx/store';
import { ingressEgressReducer } from './ingress-egress.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    IngressEgressComponent,
    StatisticsComponent,
    DetailComponent,
    IngressEgressOrderPipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature( 'ingressEgress', ingressEgressReducer ),
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    DashboardModule,
    GraphicsComponent,
  ]
})
export class IngressEgressModule { }
