/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NgxMqttService } from './ngx-mqtt.service';

describe('Service: NgxMqtt', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxMqttService]
    });
  });

  it('should ...', inject([NgxMqttService], (service: NgxMqttService) => {
    expect(service).toBeTruthy();
  }));
});
