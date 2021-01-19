import { TestBed } from '@angular/core/testing';

import { ChartDonutService } from './chart-donut.service';

describe('ChartDonutService', () => {
  let service: ChartDonutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartDonutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
