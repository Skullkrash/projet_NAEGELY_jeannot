import { Injectable, WritableSignal, signal } from '@angular/core';
import { CreditCard } from '../../models/CreditCard';

@Injectable({
  providedIn: 'root'
})
export class CreditCardsService {
  private creditCardsSignal: WritableSignal<CreditCard[]> = signal<CreditCard[]>([]);

  constructor() { }

  public getCards() {
    return this.creditCardsSignal();
  }

  public addCard(newCard: CreditCard) {
    this.creditCardsSignal.update(cards => [...cards, newCard]);
  }

  public deleteCard(unwantedCard: CreditCard) {
    this.creditCardsSignal.update(cards => cards.filter((card) => { !(card === unwantedCard) }));
  }
}
