/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FhubService } from './fhub.service';

describe('Service: Fhub', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FhubService]
    });
  });

  it('should ...', inject([FhubService], (service: FhubService) => {
    expect(service).toBeTruthy();
  }));
});
