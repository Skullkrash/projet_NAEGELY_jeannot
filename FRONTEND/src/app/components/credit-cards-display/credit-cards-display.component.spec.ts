import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardsDisplayComponent } from './credit-cards-display.component';

describe('CreditCardsDisplayComponent', () => {
  let component: CreditCardsDisplayComponent;
  let fixture: ComponentFixture<CreditCardsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditCardsDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditCardsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
