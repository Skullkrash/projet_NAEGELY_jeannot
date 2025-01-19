import { Objekt } from "../models/Objekt";

export class AddObjekt {
  static readonly type = '[Objekt] Add';
  constructor(public payload: Objekt) {}
}

export class DelObjekt {
  static readonly type = '[Objekt] Del';

  constructor(public payload: Objekt) {}
}

export class DelCart {
  static readonly type = '[Objekt] Delete cart';

  constructor(public payload: Objekt[]) {}
}
