import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ReservaSalaPage } from './reserva-sala.page';
import { ApiService } from '../../services/api.service';

describe('ReservaSalaPage', () => {
  let component: ReservaSalaPage;
  let fixture: ComponentFixture<ReservaSalaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservaSalaPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        { provide: ApiService, useValue: { getSalas: () => of([]) } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservaSalaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
