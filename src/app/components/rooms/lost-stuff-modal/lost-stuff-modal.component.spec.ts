import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LostStuffModalComponent } from './lost-stuff-modal.component';

describe('LostStuffModalComponent', () => {
  let component: LostStuffModalComponent;
  let fixture: ComponentFixture<LostStuffModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostStuffModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LostStuffModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
