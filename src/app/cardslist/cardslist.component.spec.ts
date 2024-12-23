import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardslistComponent } from './cardslist.component';

describe('CardslistComponent', () => {
  let component: CardslistComponent;
  let fixture: ComponentFixture<CardslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardslistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
