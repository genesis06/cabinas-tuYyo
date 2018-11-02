import { TestBed, inject } from '@angular/core/testing';

import { VehiculeTypeService } from './vehicule-type.service';

describe('VehiculeTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehiculeTypeService]
    });
  });

  it('should be created', inject([VehiculeTypeService], (service: VehiculeTypeService) => {
    expect(service).toBeTruthy();
  }));
});
