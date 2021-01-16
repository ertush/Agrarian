/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChartTempService } from './chart-temp.service';

describe('Service: ChartTemp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartTempService]
    });
  });

  it('should ...', inject([ChartTempService], (service: ChartTempService) => {
    expect(service).toBeTruthy();
  }));
});
