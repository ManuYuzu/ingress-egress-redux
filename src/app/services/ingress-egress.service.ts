import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IngressEgress } from '../models/ingress-egress.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngressEgressService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService

  ) { }

  createIngressEgress( ingressEgress: IngressEgress ) {

    const uid = this.authService.user.uid;

    if ('uid' in ingressEgress) delete ingressEgress.uid;

    return this.firestore.doc(`${ uid }/ingress-egress`)
      .collection('items')
      .add({ ...ingressEgress })

  }

  removeIngressEgress( uidItem: string ) {

    const uidUser = this.authService.user.uid;

    return this.firestore.doc(`${ uidUser }/ingress-egress/items/${ uidItem }`)
      .delete();

  }

  ingressEgressListener( uid: string ) {

    return this.firestore.collection(`${ uid }/ingress-egress/items`)
      .snapshotChanges()
      .pipe(
        map( snapshot => snapshot.map( doc => ({
            uid:doc.payload.doc.id,
            ...doc.payload.doc.data() as Object
            })
          )
        )
      )
  }

}
