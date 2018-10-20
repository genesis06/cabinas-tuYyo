import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkShiftModalComponent } from './add-work-shift-modal.component';

describe('AddIncomeModalComponent', () => {
  let component: AddWorkShiftModalComponent;
  let fixture: ComponentFixture<AddWorkShiftModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWorkShiftModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkShiftModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
