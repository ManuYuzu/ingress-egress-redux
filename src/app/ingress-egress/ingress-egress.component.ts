import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IngressEgress } from '../models/ingress-egress.model';
import { IngressEgressService } from '../services/ingress-egress.service';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as ui from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingress-egress',
  templateUrl: './ingress-egress.component.html',
  styles: ``
})
export class IngressEgressComponent implements OnInit, OnDestroy {

  ingressEgressForm!: FormGroup;
  type: string = 'ingress';
  loading: boolean = false;
  loadingSubs!: Subscription;

  constructor(
    private fb: FormBuilder,
    private ingressEgressService: IngressEgressService,
    private store: Store<AppState>
   ) {}

  ngOnInit(): void {

    this.loadingSubs = this.store
      .select('ui')
      .subscribe( ({ isLoading }) => this.loading = isLoading )

    this.ingressEgressForm = this.fb.group({
      description: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required])
    })
  }

  ngOnDestroy(): void {
      this.loadingSubs.unsubscribe();
  }

  saveForm() {

    if ( !this.ingressEgressForm.valid ) return

    this.store.dispatch( ui.isLoading() );


    const { description, amount } = this.ingressEgressForm.value;

    const ingressEgress = new IngressEgress( description, amount, this.type );

    this.ingressEgressService.createIngressEgress( ingressEgress )
      .then( () => {
        this.ingressEgressForm.reset();
        this.store.dispatch( ui.stopLoading() );

        Swal.fire('Registro creado correctamente');
      })
      .catch( err => {
        this.store.dispatch( ui.stopLoading() );

        Swal.fire('Ups, ha habido un eror');
      })
  }
}
