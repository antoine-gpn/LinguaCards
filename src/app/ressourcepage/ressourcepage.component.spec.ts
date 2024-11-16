import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourcepageComponent } from './ressourcepage.component';

describe('RessourcepageComponent', () => {
  let component: RessourcepageComponent;
  let fixture: ComponentFixture<RessourcepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RessourcepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RessourcepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
