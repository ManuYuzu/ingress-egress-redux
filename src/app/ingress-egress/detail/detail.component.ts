import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngressEgress } from '../../models/ingress-egress.model';
import { Subscription, tap } from 'rxjs';
import { IngressEgressService } from '../../services/ingress-egress.service';
import Swal from 'sweetalert2';
import { AppStateIngressEgress } from '../ingress-egress.reducer';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: ``
})
export class DetailComponent implements OnInit, OnDestroy {

  ingressEgressSubs!: Subscription
  ingressEgress: IngressEgress[] = []

  constructor(
    private store: Store<AppStateIngressEgress>,
    private ingressEgressService: IngressEgressService
  ) {}

  ngOnInit(): void {
    this.ingressEgressSubs =  this.store.select('ingressEgress')
      .subscribe(({ items }) => this.ingressEgress = items )
  }

  ngOnDestroy(): void {
    this.ingressEgressSubs.unsubscribe()
  }

  remove( uid: string | undefined ) {
    if ( !uid ) return;

    this.ingressEgressService.removeIngressEgress( uid )
    .then( () => Swal.fire('Elemento eliminado correctamente') )
    .catch( () => Swal.fire('¡Ups! Ha ocurrido un error') )

  }
}
