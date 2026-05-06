import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, ModalController } from '@ionic/angular';
import { of } from 'rxjs';

import { DetalhesModalComponent } from './detalhes-modal.component';
import { ApiService } from 'src/app/services/api.service';

describe('DetalhesModalComponent', () => {
  let component: DetalhesModalComponent;
  let fixture: ComponentFixture<DetalhesModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DetalhesModalComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ModalController, useValue: { dismiss: jasmine.createSpy('dismiss') } },
        { provide: ApiService, useValue: { getProfessores: () => of({ data: [] }) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalhesModalComponent);
    component = fixture.componentInstance;
    component.sala = { id: 1 };
    component.data = '2026-05-05';
    component.reservas = [];
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
