import { TestBed, inject } from '@angular/core/testing';

import { ArticuleService } from './articule.service';

describe('ArticuleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticuleService]
    });
  });

  it('should be created', inject([ArticuleService], (service: ArticuleService) => {
    expect(service).toBeTruthy();
  }));
});
