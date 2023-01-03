import { TestBed } from '@angular/core/testing';

import { CostEstimationService } from './cost-estimation.service';

describe('CostEstimationService', () => {
  let service: CostEstimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostEstimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
