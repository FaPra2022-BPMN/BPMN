import { TestBed } from '@angular/core/testing';

import { PetrinetService } from './petrinet.service';

describe('PetrinetService', () => {
  let service: PetrinetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetrinetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
