import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent implements OnInit, OnDestroy {

  userSubs!: Subscription;
  username: string = 'Usuario'

  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
      this.userSubs = this.store.select('auth')
      .subscribe( ({ user }) => {

        if ( !user ) return;

        const { user: username } = user

        this.username = username

      })
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe()
  }
}
