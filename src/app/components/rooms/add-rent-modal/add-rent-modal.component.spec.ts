import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRentModalComponent } from './add-rent-modal.component';

describe('AddRoomModalComponent', () => {
  let component: AddRentModalComponent;
  let fixture: ComponentFixture<AddRentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
