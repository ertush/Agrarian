/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SoilmqttService } from './soilmqtt.service';

describe('Service: Soilmqtt', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoilmqttService]
    });
  });

  it('should ...', inject([SoilmqttService], (service: SoilmqttService) => {
    expect(service).toBeTruthy();
  }));
});
