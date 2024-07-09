import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  loginUser() {
    if (!this.loginForm.valid ) return;

      Swal.fire({
        title: "Un momento, por favor...",
        didOpen: () => {
          Swal.showLoading();
        }
      });

    const { email, password } = this.loginForm.value;

    this.authService.loginUser( email, password )
      .then(
        credentials => {

          Swal.close();

          this.router.navigate(['/'])
        }
      )
      .catch( error => {
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
