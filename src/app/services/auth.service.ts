import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { AppState } from '../app.reducer';
import * as auth from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription!: Subscription;

  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthListener() {

    this.auth.authState.subscribe( fbUser => {

      if( fbUser ) {

        this.userSubscription = this.firestore.doc(`${fbUser.uid}/user`)
          .valueChanges().subscribe( firestoreUser => {

            const user = User.fromFirebase( firestoreUser as User )
            this.store.dispatch( auth.setUser({ user }) )

          })

      } else {

        if( this.userSubscription ) this.userSubscription.unsubscribe();

        this.store.dispatch( auth.unsetUser() );

      }
    })

  }

  createUser( username: string, email: string, password: string ) {

        return this.auth.createUserWithEmailAndPassword( email, password )
          .then( ({ user }) => {

            if (!user || !user.email ) return;

            const newUser = new User( user.uid, username, user.email );

            return this.firestore.doc(`${ user.uid }/user`).set({ ...newUser })

          })

  }

  loginUser( email: string, password: string ) {

    return this.auth.signInWithEmailAndPassword( email, password );

  }

  logoutUser() {

    return this.auth.signOut();

  }

  isAuth() {
    return this.auth.authState.pipe(
      map( fbUser => fbUser !== null )
    )
  }

}
