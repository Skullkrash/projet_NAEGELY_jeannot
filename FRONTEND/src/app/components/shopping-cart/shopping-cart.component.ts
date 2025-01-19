import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { Objekt } from '../../shared/models/Objekt';
import { Store } from '@ngxs/store';
import { ObjektState } from '../../shared/states/objekts-state';
import { DelObjekt } from '../../shared/actions/objekt-actions';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  objekts: Objekt[] = [];
  totalPrice: number = 0;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(ObjektState.getObjekts)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(result => {
          this.objekts = result;
          this.totalPrice = 0;
          this.objekts.forEach(objekt => this.totalPrice += (objekt.prix * objekt.stock));
        });
  }

  public removeObjekt(objektToRemove: Objekt) : void {
    this.store.dispatch(new DelObjekt(objektToRemove))
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
