import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';

import { CalendarioPage } from './calendario.page';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

describe('CalendarioPage', () => {
  let component: CalendarioPage;
  let fixture: ComponentFixture<CalendarioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarioPage],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ id: '1' }) },
          },
        },
        {
          provide: Router,
          useValue: {
            getCurrentNavigation: () => ({ extras: { state: { nome: 'Sala Teste' } } }),
          },
        },
        {
          provide: ApiService,
          useValue: {
            getReservationsByDate: () => of([]),
            createReservation: () => of({}),
            updateReservation: () => of({}),
            deleteReservation: () => of({}),
          },
        },
        {
          provide: AuthService,
          useValue: {
            getCurrentUser: () => of({ id: 1, role: 'teacher' }),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarioPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
