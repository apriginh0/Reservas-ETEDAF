import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { of } from 'rxjs';

import { AgendamentosPage } from './agendamentos.page';
import { ApiService } from 'src/app/services/api.service';

describe('AgendamentosPage', () => {
  let component: AgendamentosPage;
  let fixture: ComponentFixture<AgendamentosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgendamentosPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ApiService, useValue: { getSalas: () => of([]), getReservations: () => of([]) } },
        { provide: ModalController, useValue: { create: jasmine.createSpy('create') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgendamentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
