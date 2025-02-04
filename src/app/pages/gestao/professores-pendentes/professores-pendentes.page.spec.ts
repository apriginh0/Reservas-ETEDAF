import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfessoresPendentesPage } from './professores-pendentes.page';

describe('ProfessoresPendentesPage', () => {
  let component: ProfessoresPendentesPage;
  let fixture: ComponentFixture<ProfessoresPendentesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessoresPendentesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
