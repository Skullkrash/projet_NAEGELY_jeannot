import { Component, OnInit } from '@angular/core';
import { Objekt } from '../../shared/models/Objekt';
import { ApiService } from '../../shared/services/api/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { Store } from '@ngxs/store';
import { AddObjekt } from '../../shared/actions/objekt-actions';

@Component({
  selector: 'objekts-display',
  standalone: true,
  imports: [CommonModule, SearchFilterComponent],
  providers: [ApiService],
  templateUrl: './objekts-display.component.html',
  styleUrl: './objekts-display.component.scss'
})
export class ObjektsDisplayComponent implements OnInit {
  public login: string = '';
  public objekts: Objekt[] = [];
  public displayedObjekts: Objekt[] = [];

  constructor(private apiService: ApiService, private router: Router, private store: Store) {
    this.login = localStorage.getItem('login') || '';
    if (this.login === '') {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.apiService.getCatalogue().subscribe((objekts: Objekt[]) => {
      this.displayedObjekts = objekts;
      this.objekts = this.displayedObjekts;
    });
  }

  public updateDisplayedObjekts(newObjektList: Objekt[]) {
    this.displayedObjekts = newObjektList;
  }

  public addObjekt(newObjektForCart: Objekt) {
    newObjektForCart.stock = 1;
    this.store.dispatch(new AddObjekt(newObjektForCart));
    console.log("Should have sent objekt \"" + newObjektForCart.nom + "\" to store...");
  }
}
