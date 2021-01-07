import { environment as env, options } from './../../environments/environment';
import { Injectable, OnDestroy } from '@angular/core';
import { connect } from 'mqtt';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MqttService implements OnDestroy {

   private client: any;

   constructor() {
     this.client = connect(env.host, options);

     this.client.on('connect', () => {
    console.log('Client connected:' + env.clientId);
    // Subscribe to all Sensor Topics
    this.client.subscribe(env.topic.esp8266, { qos: 0 }, (state: any) => {console.log({state}); });
    this.client.subscribe(env.topic.temp, { qos: 0 }, (state: any) => {console.log({state}); });
    this.client.subscribe(env.topic.custom, { qos: 0 }, (state: any) => {console.log({state}); });

    this.client.subscribe('temperature', { qos: 0 }, (state: any) => {console.log({state}); });
    this.client.subscribe('humidity', { qos: 0 }, (state: any) => {console.log({state}); });
    this.client.subscribe('atpressure', { qos: 0 }, (state: any) => {console.log({state}); });

    });

    // Handle error
    this.client.on('error', (err) => {
      console.log('Connection error: ', err);
      this.client.end();
    });
    // Reconnect
    this.client.on('reconnect', () => {
      console.log('Reconnecting...');
    });
   }

  fetchData(): Observable<string> {
    return new Observable(subscriber => {
    try {
      this.client.on('message', (topic, message, packet) => {
      subscriber.next(`${message.toString()}/${topic}`);
    });
   } catch (e) {
      subscriber.error(e);
   }
  });

  }

  ngOnDestroy(): void {
    this.client.end();
  }

  }



