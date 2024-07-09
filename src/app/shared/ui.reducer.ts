import { Action, createReducer, on } from "@ngrx/store";
import { isLoading, stopLoading } from "./ui.actions";

export interface State {
  isLoading: boolean;
}

export const initialState = {
  isLoading: false,
};

const _uiReducer = createReducer(
  initialState,
  on( isLoading,   state => ({ ...state, isLoading: true  }) ),
  on( stopLoading, state => ({ ...state, isLoading: false }) ),
);

export function uiReducer( state: State = initialState, action: Action ) {
  return _uiReducer( state, action )
};
