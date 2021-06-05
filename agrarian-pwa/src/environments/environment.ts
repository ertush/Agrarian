// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const c_id: any = `mqttjs_ ${(Math.random() / 100).toString(16).substr(2, 8)}`;

export const environment = {
    production: false,
    clientId : c_id,
    host : 'ws://localhost',
    topic : {
      soil: 'esp8266/soil',
      atmp: 'esp8266/atpressure',
      temp: 'esp8266/temperature',
      light: 'esp8266/light',
      humidity: 'esp8266/humidity',
      lat: 'esp8266/lat',
      lng: 'esp8266/lng'
    },
    api: {
      url: 'https://api.openweathermap.org/data/2.5/weather',
      appId: 'fd7aadde4652a91a190ed2267fb6e162'
    },
    firebase : {
      apiKey: 'AIzaSyBodv1wdrbqAlc_1oIPnSN7lZESRPC62u4',
      authDomain: 'agrarian-ec4bc.firebaseapp.com',
      databaseURL: 'https://agrarian-ec4bc.firebaseio.com',
      projectId: 'agrarian-ec4bc',
      storageBucket: 'agrarian-ec4bc.appspot.com',
      messagingSenderId: '833411832049',
      appId: '1:833411832049:web:e435145da4e57b1a1af150'
    }
};


export const options: any = {
  keepalive: 60,
  port: 9100,
  host : 'ws://localhost',
  clientId: c_id,
  username: '',
  password: '',
  protocolId: 'MQTT',
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  connectTimeout: 30 * 1000,
  will: {
    topic: 'WillMsg',
    payload: 'Connection Closed abnormally..!',
    qos: 0,
    retain: true
  }
};

export const types: string[] = ['SEV: LOW', 'SEV: MEDIUM', 'SEV: HIGH', 'ENHANCEMENT', 'FEATURE', 'OTHER'];

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
