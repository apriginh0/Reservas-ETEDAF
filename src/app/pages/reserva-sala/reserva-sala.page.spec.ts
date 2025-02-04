import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservaSalaPage } from './reserva-sala.page';

describe('ReservaSalaPage', () => {
  let component: ReservaSalaPage;
  let fixture: ComponentFixture<ReservaSalaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaSalaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
