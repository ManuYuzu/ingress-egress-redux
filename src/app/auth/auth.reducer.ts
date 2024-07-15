import { Action, createReducer, on } from "@ngrx/store";
import * as auth from "./auth.actions";
import { User } from "../models/user.model";

export interface State {
  user: User | null;
}

export const initialState: State = { user: null };

const _Reducer = createReducer( initialState,

  on( auth.setUser, (state,{ user }) => ( { ...state, user: {...user } } ) ),
  on( auth.unsetUser, state => ( {...state, user: null } ) )

);

export function authReducer( state: State = initialState, action: Action ) {
  return _Reducer( state, action )
};
