import { TestBed } from '@angular/core/testing';

import { PractiseService } from './practise.service';

describe('PractiseService', () => {
  let service: PractiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PractiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
