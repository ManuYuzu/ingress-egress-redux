import { Action, createReducer, on } from "@ngrx/store";
import * as ingressEgressActions from './ingress-egress.actions'
import { IngressEgress } from "../models/ingress-egress.model";
import { AppState } from "../app.reducer";

export interface State {
  items: IngressEgress[]
}

export interface AppStateIngressEgress extends AppState {
  ingressEgress: State
}

export const initialState: State = {
  items: []
};

const _ingressEgressReducer = createReducer( initialState,
  on( ingressEgressActions.setItems,
    (state, { items }) => ( { ...state, items: [...items] } )
  ),
  on( ingressEgressActions.unsetItems,
    state => ( { ...state, items: [] } )
  )
);

export function ingressEgressReducer( state: State = initialState, action: Action ) {
  return _ingressEgressReducer( state, action )
};
