import { Component, EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Objekt } from '../../shared/models/Objekt';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'search-filter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss'
})
export class SearchFilterComponent {
  @Input() objekts: Objekt[] = [];
  @Input() baseObjekts: Objekt[] = [];
  @Output() objektsChange = new EventEmitter<Objekt[]>();

  public inputPlaceholder: string = "Search by name";
  public searchFilter: string = "name";
  public inputText: string = '';

  constructor() {}

  public updateFilter(newFilter: string) {
    this.inputText = '';
    this.searchFilter = newFilter;
    this.inputPlaceholder = "Search by " + newFilter;
    this.objekts = this.baseObjekts;
    this.objektsChange.emit(this.objekts);
  }

  public filterObjekts() {
    let tempObjekts = [];
    switch (this.searchFilter) {
      case "name":
        tempObjekts = this.baseObjekts.map(objekt => {
          if (objekt.nom.toLowerCase().includes(this.inputText.toLowerCase())) { return objekt; }
          else { return null; }
        });
        this.objekts = tempObjekts.filter(objekt => objekt != null);
        break;
      case "description":
        tempObjekts = this.baseObjekts.map(objekt => {
          if (objekt.description.toLowerCase().includes(this.inputText.toLowerCase())) { return objekt; }
          else { return null; }
        });
        this.objekts = tempObjekts.filter(objekt => objekt != null);
        break;
    }
    this.objektsChange.emit(this.objekts);
  }
}
