import { TestBed, async, inject } from '@angular/core/testing';
import { MqttService } from './mqtt.service';

describe('Service: Soilmqtt', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MqttService]
    });
  });

  it('should ...', inject([MqttService], (service: MqttService) => {
    expect(service).toBeTruthy();
  }));
});
