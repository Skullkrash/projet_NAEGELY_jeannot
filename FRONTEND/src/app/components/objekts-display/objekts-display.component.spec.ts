import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjektsDisplayComponent } from './objekts-display.component';

describe('ObjektsDisplayComponent', () => {
  let component: ObjektsDisplayComponent;
  let fixture: ComponentFixture<ObjektsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjektsDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjektsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
