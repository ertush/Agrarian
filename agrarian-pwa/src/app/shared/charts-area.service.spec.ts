/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChartsAreaService } from './charts-area.service';

describe('Service: ChartsArea', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartsAreaService]
    });
  });

  it('should ...', inject([ChartsAreaService], (service: ChartsAreaService) => {
    expect(service).toBeTruthy();
  }));
});
