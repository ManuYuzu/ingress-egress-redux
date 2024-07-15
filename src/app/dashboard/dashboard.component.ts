import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { IngressEgressService } from '../services/ingress-egress.service';
import * as ingressEgress from '../ingress-egress/ingress-egress.actions';
import { IngressEgress } from '../models/ingress-egress.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs!: Subscription;
  ingressEgressSubs!: Subscription;

  constructor (
    private store: Store<AppState>,
    private ingressEgressService: IngressEgressService
  ){}

  ngOnInit(): void {

    this.userSubs = this.store.select('auth')
      .pipe(
        filter( auth => auth.user !== null )
      )
      .subscribe(( { user } ) => {

        if (!user) return

        this.ingressEgressSubs = this.ingressEgressService.ingressEgressListener( user.uid )
          .subscribe( ingressEgressFB => {

            this.store.dispatch(
              ingressEgress.setItems({ items: ingressEgressFB as [] })
            )

          });

      })

  }

  ngOnDestroy(): void {
    this.ingressEgressSubs.unsubscribe();
    this.userSubs.unsubscribe();
  }
}
