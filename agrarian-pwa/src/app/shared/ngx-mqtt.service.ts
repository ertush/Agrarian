import { environment as env, options} from './../../environments/environment';
import { AsyncClient, connect } from 'async-mqtt';
import { Injectable, OnInit, OnDestroy } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class NgxMqttService implements OnInit, OnDestroy {

constructor(public client: AsyncClient) {
  this.client = connect(env.host, options);
  console.log('Connected to broker');
}

 bootStrapWs = async (client: AsyncClient) => {

    console.log('Starting');
    try {
        await client.subscribe(env.topic, { qos: 0 });
        console.log(`Subscribed to topic ${env.topic}`);
    } catch (e) {
        console.log(e.stack);
        process.exit();
    }
}

cleanUp = async (client: AsyncClient) => {
  try {
    await client.end();
    console.log('WebSocket Closed');
} catch (e) {
    console.log(e.stack);
    process.exit();
}
}

fetchData(): any {
  this.client.on('message', (topic, message, packet) => {
    console.log('Received Message: ' + message.toString() + '\nOn topic: ' + topic);
  });

}

ngOnInit() {
 this.bootStrapWs(this.client)
 .then(value => {console.log({value}); })
 .catch(err => {console.log({err}); });
}

ngOnDestroy() {
 this.cleanUp(this.client)
 .catch(reason => {console.log(reason); });
}

}
