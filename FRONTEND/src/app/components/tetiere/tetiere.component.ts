import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgxsModule, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ObjektState } from '../../shared/states/objekts-state';
import { CommonModule } from '@angular/common';
import { DelCart } from '../../shared/actions/objekt-actions';
import { Objekt } from '../../shared/models/Objekt';

@Component({
  selector: 'tetiere',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, NgxsModule],
  templateUrl: './tetiere.component.html',
  styleUrl: './tetiere.component.scss'
})
export class TetiereComponent {
  badgenum: number = 2;
  nb$: Observable<number>;

  constructor(private router: Router, private store: Store) {
    this.nb$ = this.store.select(ObjektState.getNbObjekts);
  }

  public Logout(): void {
    localStorage.removeItem('login');
    localStorage.removeItem('name');
    localStorage.removeItem('surname');
    let emptyCart: Objekt[] = [];
    this.store.dispatch(new DelCart(emptyCart));
    this.router.navigate(['/home']);
  }
}
