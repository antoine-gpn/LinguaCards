import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardfullComponent } from './cardfull.component';

describe('CardfullComponent', () => {
  let component: CardfullComponent;
  let fixture: ComponentFixture<CardfullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardfullComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
