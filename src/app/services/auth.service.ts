import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore
  ) { }

  initAuthListener() {

    this.auth.authState.subscribe( fbUser => {
      console.log(fbUser);

      if( fbUser ) {
        console.log({
          uid: fbUser.uid,
          email: fbUser.email,
        });

      }
    })

  }

  createUser( username: string, email: string, password: string ) {

        return this.auth.createUserWithEmailAndPassword( email, password )
          .then( ({ user }) => {

            if (!user || !user.email ) return;

            const newUser = new User( user.uid, username, user.email );

            return this.firestore.doc(`${ user.uid }/user`)
              .set({ ...newUser })

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
