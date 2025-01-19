import { Component } from '@angular/core';
import { CreditCardsService } from '../../shared/services/credit-cards/credit-cards.service';
import { CreditCardNumberPipe } from '../../shared/pipes/credit-card-number.pipe';

@Component({
  selector: 'credit-cards-display',
  standalone: true,
  imports: [CreditCardNumberPipe],
  templateUrl: './credit-cards-display.component.html',
  styleUrl: './credit-cards-display.component.scss'
})
export class CreditCardsDisplayComponent {

  constructor (private creditCardService: CreditCardsService) { }

  public get cards() {
    return this.creditCardService.getCards();
  }
}
