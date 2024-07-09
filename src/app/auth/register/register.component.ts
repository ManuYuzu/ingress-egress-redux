import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      user: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });

  }

  createUser() {
    if ( !this.registerForm.valid ) return;

    Swal.fire({
        title: "Un momento, por favor...",
        didOpen: () => {
          Swal.showLoading();
        }
      });

    const { user, email, password } = this.registerForm.value;

    this.authService.createUser( user, email, password )
      .then(
        credentials => {
          console.log(credentials);

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
      } )
  };


}
