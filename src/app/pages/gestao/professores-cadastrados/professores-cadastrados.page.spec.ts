import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfessoresCadastradosPage } from './professores-cadastrados.page';

describe('ProfessoresCadastradosPage', () => {
  let component: ProfessoresCadastradosPage;
  let fixture: ComponentFixture<ProfessoresCadastradosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessoresCadastradosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
