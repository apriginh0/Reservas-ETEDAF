import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

import { ProfessoresPendentesPage } from './professores-pendentes.page';
import { UserService } from 'src/app/services/user.service';

describe('ProfessoresPendentesPage', () => {
  let component: ProfessoresPendentesPage;
  let fixture: ComponentFixture<ProfessoresPendentesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfessoresPendentesPage],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: UserService,
          useValue: {
            getPendingUsers: () => of([]),
            approveUser: () => of({}),
            rejectUser: () => of({}),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessoresPendentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
