import { Component, OnInit } from '@angular/core';
import { Objekt } from '../../shared/models/Objekt';
import { ApiService } from '../../shared/services/api/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { Observable } from 'rxjs';

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

  constructor(private apiService: ApiService, private router: Router) {
    this.login = localStorage.getItem('login') || '';
    if (!this.login) {
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
}
