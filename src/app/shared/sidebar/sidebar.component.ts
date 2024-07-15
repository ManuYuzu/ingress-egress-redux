import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent implements OnInit, OnDestroy {

  userSubs!: Subscription;
  username: string = 'Usuario'

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
      this.userSubs = this.store.select('auth')
      .subscribe( ({ user }) => {

        if ( !user ) return;

        this.username = user.user

      })
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe()
  }

  logoutUser() {

    this.authService.logoutUser()
      .then(() =>{
        this.router.navigate(['/login']);
      })

  }
}
