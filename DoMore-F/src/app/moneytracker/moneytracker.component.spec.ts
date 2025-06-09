import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneytrackerComponent } from './moneytracker.component';

describe('MoneytrackerComponent', () => {
  let component: MoneytrackerComponent;
  let fixture: ComponentFixture<MoneytrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoneytrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneytrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
