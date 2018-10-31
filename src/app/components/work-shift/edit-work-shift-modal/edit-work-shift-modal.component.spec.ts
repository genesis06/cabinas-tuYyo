import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkShiftModalComponent } from './edit-work-shift-modal.component';

describe('EditWorkShiftModalComponent', () => {
  let component: EditWorkShiftModalComponent;
  let fixture: ComponentFixture<EditWorkShiftModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWorkShiftModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkShiftModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
