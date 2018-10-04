import { TestBed, inject } from '@angular/core/testing';

import { CabinService } from './cabin.service';

describe('CabinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CabinService]
    });
  });

  it('should be created', inject([CabinService], (service: CabinService) => {
    expect(service).toBeTruthy();
  }));
});
