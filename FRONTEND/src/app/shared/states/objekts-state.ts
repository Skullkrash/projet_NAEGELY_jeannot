import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddObjekt, DelObjekt, DelCart } from '../actions/objekt-actions';
import { ObjektStateModel } from './objekts-state-model';
import { Objekt } from '../models/Objekt';

@State<ObjektStateModel>({
  name: 'objekts',
  defaults: {
    objekts: [],
  },
})

@Injectable()
export class ObjektState {

  @Selector()
  static getObjekts(state: ObjektStateModel): Objekt[] {
    return state.objekts;
  }

  @Selector()
  static getNbObjekts(state: ObjektStateModel) : number {
    let nbObjekts = 0;
    state.objekts.forEach(objekt => nbObjekts += objekt.stock);
    return nbObjekts;
  }

  @Action(AddObjekt)
    add(
      { getState, patchState }: StateContext<ObjektStateModel>,
      { payload }: AddObjekt
    ) {
    let state = getState();
    let existsInCart: boolean = false;
    state.objekts.forEach(objekt => { if (objekt.nom == payload.nom) existsInCart = true });
    console.log('existsInCart: ' + existsInCart);
    if (existsInCart) {
      patchState({ objekts : state.objekts.map(objekt => {
        if (objekt.nom == payload.nom) {
          objekt.stock += 1;
        }
        return objekt;
      })});
    }
    else {
      payload.stock = 1;
      patchState({ objekts : [...state.objekts, payload] });
    }
  }

  @Action(DelObjekt)
  del(
    { getState, patchState }: StateContext<ObjektStateModel>,
    { payload }: DelObjekt
  ) {
    const state = getState();
    if (payload.stock > 1) {
      patchState({ objekts : state.objekts.map(objekt => {
        if (objekt.nom == payload.nom) {
          objekt.stock -= 1;
        }
        return objekt;
      })});
    }
    else {
      patchState({ objekts: state.objekts.filter(
        objekt => !(payload.nom == objekt.nom)
      ) });
    }
  }

  @Action(DelCart)
  deleteCart(
    { patchState }: StateContext<ObjektStateModel>,
    { payload }: DelCart
  ) {
    patchState({ objekts: payload });
  }
}
