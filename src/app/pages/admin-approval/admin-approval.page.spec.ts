import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminApprovalPage } from './admin-approval.page';

describe('AdminApprovalPage', () => {
  let component: AdminApprovalPage;
  let fixture: ComponentFixture<AdminApprovalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApprovalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
