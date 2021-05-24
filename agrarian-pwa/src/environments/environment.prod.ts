const c_id: any = `mqttjs_ ${(Math.random() / 100).toString(16).substr(2, 8)}`;

export const environment = {
  production: true,
  clientId : c_id,
    host : 'ws://localhost',
    topic : {
      soil: 'soil',
      atmp: 'atpressure',
      temp: 'temperature',
      light: 'light',
      humidity: 'humidity'
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
