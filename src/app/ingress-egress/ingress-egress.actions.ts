import { createAction, props } from "@ngrx/store"
import { IngressEgress } from "../models/ingress-egress.model";

export const setItems = createAction(
  '[IngressEgress] Set Items',
  props<{ items: IngressEgress[] }>()
);

export const unsetItems = createAction(
  '[IngressEgress] Unset Items'
);
