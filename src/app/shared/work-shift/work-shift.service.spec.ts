import { TestBed, inject } from '@angular/core/testing';

import { WorkShiftService } from './work-shift.service';

describe('WorkShiftService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkShiftService]
    });
  });

  it('should be created', inject([WorkShiftService], (service: WorkShiftService) => {
    expect(service).toBeTruthy();
  }));
});
