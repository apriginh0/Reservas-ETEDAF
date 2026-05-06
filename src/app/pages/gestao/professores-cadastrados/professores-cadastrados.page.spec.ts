import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

import { ProfessoresCadastradosPage } from './professores-cadastrados.page';
import { UserService } from 'src/app/services/user.service';

describe('ProfessoresCadastradosPage', () => {
  let component: ProfessoresCadastradosPage;
  let fixture: ComponentFixture<ProfessoresCadastradosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfessoresCadastradosPage],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: UserService,
          useValue: {
            getApprovedUsers: () => of([]),
            changeUserRole: () => of({}),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessoresCadastradosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
