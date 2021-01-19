import { TestBed } from '@angular/core/testing';

import { ChartLinesService } from './chart-lines.service';

describe('ChartLinesService', () => {
  let service: ChartLinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartLinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
