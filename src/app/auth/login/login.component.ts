import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  loading: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })

    this.uiSubscription = this.store
      .select('ui')
      .subscribe( ui => this.loading = ui.isLoading );
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  loginUser() {
    if (!this.loginForm.valid ) return;

    this.store.dispatch( ui.isLoading() );

      // Swal.fire({
      //   title: "Un momento, por favor...",
      //   didOpen: () => {
      //     Swal.showLoading();
      //   }
      // });

    const { email, password } = this.loginForm.value;

    this.authService.loginUser( email, password )
      .then(
        () => {

          // Swal.close();

          this.store.dispatch( ui.stopLoading() );

          this.router.navigate(['/'])
        }
      )
      .catch( error => {
          this.store.dispatch( ui.stopLoading() );

        const fixedMessage = error.message
          .replace('Firebase: ', '')
          .replace(/\(.*?\)./g, '')

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: fixedMessage
        });
      } );
  }
}
